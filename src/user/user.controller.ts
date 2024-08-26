import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

import CreateUserDTO from './DTOs/create-user.dto';
import UpdateUserDTO from './DTOs/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.register(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDTO) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
