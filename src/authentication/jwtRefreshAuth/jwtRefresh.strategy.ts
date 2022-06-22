import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interface/jwtPayload.interface';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthenticationService) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }

  async validate(req: Request, payload: JwtPayload, done: void): Promise<any> {
    if (
      req.headers['authorization'] &&
      req.headers['authorization'].split(' ')[0] === 'Bearer'
    ) {
      const refreshToken = req.headers['authorization'].split(' ')[1];
      const user = await this.authService.getUserIfRefreshTokenMatches(
        refreshToken,
        payload.userId,
      );
      if (!user) {
        throw new UnauthorizedException('Wrong token!');
      }

      return user;
    }
    throw new UnauthorizedException('Wrong token!');
  }
}
