import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from './DTOs/create-user.dto';
import UpdateUserDTO from './DTOs/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async register(user: CreateUserDTO) {
    let newUser = this.usersRepository.create({
      ...user,
    });
    await this.usersRepository.save(newUser);
    return { message: 'User created!', body: user };
  }

  async update(id: number, user: UpdateUserDTO) {
    let u = await this.usersRepository.findOne({ where: { id } });

    if (user.username) {
      u.username = user.username;
    }

    if (user.password) {
      u.password = user.password;
    }

    await this.usersRepository.save(u);
    return { message: 'User updated!' };
  }

  async delete(id: number) {
    await this.usersRepository.delete({ id });
    return { message: 'User deleted!' };
  }
}
