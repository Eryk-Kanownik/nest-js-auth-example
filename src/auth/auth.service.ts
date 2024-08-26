import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    let user = await this.usersRepository.findOne({ where: { username } });
    if (user.password === password) {
      let payload = { sub: user.id, username: user.username };
      const token = await this.jwtService.signAsync(payload);
      return { message: 'Is correct', token: token };
    }
  }
}
