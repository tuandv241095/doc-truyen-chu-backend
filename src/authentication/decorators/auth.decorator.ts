import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export function Auth(...args: string[]) {
  return applyDecorators(SetMetadata('roles', args));
}
