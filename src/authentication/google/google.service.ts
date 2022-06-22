import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { RegisteredType } from 'src/users/entities/registeredType.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.usersService.getByEmail(email + '-google');

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email);
    }
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;

    const user = await this.usersService.createWithSSO(
      {
        name: name,
        photo: userData.picture,
        usernameOrEmail: userData.email,
      },
      RegisteredType.Google,
    );

    return this.handleRegisteredUser(user);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async handleRegisteredUser(user: User) {
    if (user.type !== RegisteredType.Google) {
      throw new UnauthorizedException();
    }
    console.log('here');

    const token = this.authenticationService.getTokens(user.id);

    return {
      ...token,
      user,
    };
  }
}
