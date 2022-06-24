import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, CreateUserWithSSODto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { In } from 'typeorm';
import { RegisteredType } from './entities/registeredType.enum';
import { DatabaseFileService } from 'src/databaseFile/databaseFile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private databaseFileService: DatabaseFileService,
  ) {}

  async getByEmail(usernameOrEmail: string) {
    const user = await this.userRepository.findOne({ usernameOrEmail });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByIds(ids: string[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
    });
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(userData.password, salt);
    const newUser = this.userRepository.create({
      ...userData,
      salt,
      password,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async checkUsernameOrEmail(usernameOrEmail: string) {
    return await this.userRepository.findOne({ usernameOrEmail });
  }

  async createWithSSO(userData: CreateUserWithSSODto, type: RegisteredType) {
    const newUser = this.userRepository.create({
      ...userData,
      usernameOrEmail: userData.usernameOrEmail + '-' + type,
      type,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userRepository.findOne(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return await this.getById(userId);
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
