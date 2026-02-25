import { Controller, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.email, data.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
