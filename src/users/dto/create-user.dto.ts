import { RegisteredType } from '../entities/registeredType.enum';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
  usernameOrEmail: string;

  name: string;

  password: string;
}

export class CreateUserWithSSODto {
  usernameOrEmail: string;

  name: string;

  photo: string;
}
