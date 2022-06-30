import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { CreateUserWithSSODto } from 'src/users/dto/create-user.dto';
import { RegisteredType } from 'src/users/entities/registeredType.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class FacebookService {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async authenticate(loginInfo: CreateUserWithSSODto) {
    const user = await this.authenticationService.getUserWithSSO(
      loginInfo,
      RegisteredType.Facebook,
    );

    delete user.password;
    delete user.salt;
    delete user.currentHashedRefreshToken;
    delete user.totalCounter;

    const token = await this.authenticationService.getTokens(user.id);
    return {
      ...token,
      user,
    };
  }
}
