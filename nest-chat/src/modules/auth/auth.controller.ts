import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoRequest, LoginDtoResponse, RegisterDtoRequest } from './dto';
import { JwtGuard } from './guards';
import { Me } from './decorators';
import { User } from '../../../generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
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
  whoAmI(
    @Me()
    user: {
      id: number;
      name: string;
      email: string;
      status: User['status'];
    },
  ) {
    return this.authService.whoAmI(user);
  }
}
