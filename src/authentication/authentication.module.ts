import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './localAuth/local.strategy';
import { JwtStrategy } from './jwtAuth/jwt.strategy';
import { JwtRefreshStrategy } from './jwtRefreshAuth/jwtRefresh.strategy';
import { GoogleService } from './google/google.service';
import { FacebookService } from './facebook/facebook.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register(jwtConfig),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    GoogleService,
    FacebookService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
