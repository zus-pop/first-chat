import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoRequest, LoginDtoResponse, RegisterDtoRequest } from './dto';
import { JwtGuard } from './guards';
import { Me } from './decorators';
import { User } from '../../../generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDtoRequest: LoginDtoRequest,
  ): Promise<LoginDtoResponse> {
    return this.authService.login(loginDtoRequest);
  }

  @Post('register')
  async register(@Body() registerDtoRequest: RegisterDtoRequest) {
    return this.authService.register(registerDtoRequest);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  whoAmI(@Me() user: User) {
    return user;
  }
}
