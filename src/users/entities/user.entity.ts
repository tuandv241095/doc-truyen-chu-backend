import { Exclude } from 'class-transformer';
import { DatabaseFile } from 'src/databaseFile/entities/databaseFile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegisteredType } from './registeredType.enum';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  usernameOrEmail: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  @Exclude()
  salt?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ type: 'enum', enum: RegisteredType, default: RegisteredType.User })
  type: RegisteredType;

  @Column({
    nullable: true,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  })
  photo: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];
}
