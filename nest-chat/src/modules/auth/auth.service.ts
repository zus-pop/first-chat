import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDtoRequest,
  LoginDtoResponse,
  RegisterDtoRequest,
  RegisterDtoResponse,
} from './dto';
import { User } from '../../../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDtoRequest: LoginDtoRequest): Promise<LoginDtoResponse> {
    const { email, password: pass } = loginDtoRequest;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await this.userService.comparePassword(
      pass,
      user.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const token = this.signToken(payload);

    return {
      access_token: token,
    };
  }

  async whoAmI(user: {
    id: number;
    name: string;
    email: string;
    status: User['status'];
  }) {
    const { id } = user;
    const userInfo = await this.userService.findById(id);
    if (!userInfo) {
      throw new BadRequestException('User not found');
    }
    return userInfo;
  }

  async register(
    registerDtoRequest: RegisterDtoRequest,
  ): Promise<RegisterDtoResponse> {
    const user = await this.userService.findByEmail(registerDtoRequest.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.userService.createUser(registerDtoRequest);
    const payload = {
      sub: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    const token = this.signToken(payload);
    return {
      access_token: token,
    };
  }

  signToken(payload: Buffer | object) {
    return this.jwtService.sign(payload);
  }
}
