import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserWithSSODto } from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { TokenVerificationDto } from './dto/tokenVerification.dto';
import { FacebookService } from './facebook/facebook.service';
import { GoogleService } from './google/google.service';
import { RequestWithUser } from './interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuth/localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly googleService: GoogleService,
    private readonly facebookService: FacebookService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authenticationService.register(registrationData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('logIn')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const loginRes = this.authenticationService.logIn(user.id);

    return {
      user,
      ...loginRes,
    };
  }

  @Post('google')
  async authenticate(@Body() tokenData: TokenVerificationDto) {
    const res = await this.googleService.authenticate(tokenData.token);
    return res;
  }

  @Post('facebook')
  async facebookAuth(@Body() tokenData: CreateUserWithSSODto) {
    const res = await this.facebookService.authenticate(tokenData);
    return res;
  }
}
