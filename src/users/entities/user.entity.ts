import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
      'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg',
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
