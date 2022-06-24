import { applyDecorators, UseGuards } from '@nestjs/common';
import JwtRefreshGuard from '../jwtRefreshAuth/jwtRefreshAuth.guard';

export function AuthRefresh() {
  return applyDecorators(UseGuards(JwtRefreshGuard));
}
