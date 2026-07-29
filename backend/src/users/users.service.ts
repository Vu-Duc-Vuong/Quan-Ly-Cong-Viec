import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    try {
      return await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException(
        'Không thể tạo người dùng',
      );
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async updateProfile(
    id: number,
    updateProfileDto: any,
  ) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    await this.userRepository.update(
      id,
      updateProfileDto,
    );

    const updatedUser = await this.userRepository.findOneBy({
      id,
    });

    if (!updatedUser) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    const { password, ...result } = updatedUser;

    return result;
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    const check = await bcrypt.compare(
      oldPassword,
      user.password,
    );

    if (!check) {
      throw new BadRequestException(
        'Mật khẩu cũ không đúng',
      );
    }

    const password = await bcrypt.hash(
      newPassword,
      10,
    );

    await this.userRepository.update(
      id,
      {
        password,
      },
    );

    return {
      message: 'Đổi mật khẩu thành công',
    };
  }

  async updatePassword(
    id: number,
    password: string,
  ) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    await this.userRepository.update(
      id,
      {
        password,
      },
    );
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(
        'Không tìm thấy người dùng',
      );
    }

    return user;
  }
}