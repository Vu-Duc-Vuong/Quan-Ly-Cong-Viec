import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>

  ) {}

  create(user: Partial<User>) {

    return this.userRepository.save(user);

  }

  findByEmail(email: string) {

    return this.userRepository.findOneBy({
      email
    });

  }
  async updateProfile(

  id: number,

  updateProfileDto: any,

) {

  await this.userRepository.update(
    id,
    updateProfileDto,
  );

  const user = await this.userRepository.findOneBy({
    id,
  });

  if (!user) {
    return null;
  }

  const { password, ...result } = user;

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

    throw new BadRequestException(
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
}