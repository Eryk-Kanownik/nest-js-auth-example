import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDTO from './DTOs/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  loginUser(@Body() user: LoginUserDTO) {
    return this.authService.login(user.username, user.password);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  testRoute() {
    return { message: 'If you see this it means you are logged in' };
  }
}
