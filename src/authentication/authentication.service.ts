import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import { JwtPayload } from './interface/jwtPayload.interface';
import { CreateUserWithSSODto } from 'src/users/dto/create-user.dto';
import { RegisteredType } from 'src/users/entities/registeredType.enum';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterDto) {
    try {
      const createdUser = await this.usersService.create(registrationData);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with this email/name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logIn(userId: string) {
    const token = await this._createToken(userId);
    const refreshToken = await this._createRefreshToken(userId);

    await this.usersService.setCurrentRefreshToken(
      refreshToken.refreshAccessToken,
      userId,
    );
    return {
      ...token,
      ...refreshToken,
    };
  }

  async refresh(userId: string) {
    const user = await this.usersService.getById(userId);
    const token = await this._createToken(user.id);
    return token;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      console.log(email, plainTextPassword);
      const user = await this.usersService.getByEmail(email);

      await this.verifyPassword(plainTextPassword, user.password);
      console.log(user);

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    return this.usersService.getUserIfRefreshTokenMatches(refreshToken, userId);
  }

  public async validateUser(payload: JwtPayload) {
    const userInDb = await this.usersService.getById(payload.userId);

    if (!userInDb) {
      throw new BadRequestException(`Wrong token!`);
    }

    return userInDb;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    console.log(isPasswordMatching);

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getTokens(userId: string) {
    const { expiresIn, accessToken } = await this._createToken(userId);
    const {
      refreshExpiresIn,
      refreshAccessToken,
    } = await this._createRefreshToken(userId);
    return {
      expiresIn,
      accessToken,
      refreshExpiresIn,
      refreshAccessToken,
    };
  }

  private async _createToken(userId: string) {
    const expiresIn = process.env.EXPIRESIN;
    const payload: JwtPayload = { userId: userId };
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn,
      accessToken,
    };
  }

  private async _createRefreshToken(userId: string) {
    const refreshExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
    const payload: JwtPayload = { userId: userId };
    const refreshAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    await this.usersService.setCurrentRefreshToken(refreshAccessToken, userId);
    return {
      refreshExpiresIn,
      refreshAccessToken,
    };
  }

  public async getUserWithSSO(
    data: CreateUserWithSSODto,
    type: RegisteredType,
  ) {
    const user = await this.usersService.checkUsernameOrEmail(
      data.usernameOrEmail + '-' + type,
    );
    if (user) {
      return user;
    }
    return await this.usersService.createWithSSO(data, type);
  }
}
