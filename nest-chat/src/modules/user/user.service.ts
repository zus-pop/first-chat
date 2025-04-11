import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateUserDtoRequest } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaClient: PrismaService) {}

  async findAll() {
    this.logger.log('Fetching all users');
    return this.prismaClient.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: number) {
    this.logger.log('Fetching a single user');
    const user = await this.prismaClient.user.findFirst({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    this.logger.log('Fetching user by email');
    return this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async createUser(data: CreateUserDtoRequest) {
    this.logger.log('Creating a new user');
    const hashedPassword = await this.hashPassword(data.password);
    return this.prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async hashPassword(password: string) {
    this.logger.log('Hashing password');
    return bcrypt.hash(password, 10);
  }

  async comparePassword(target: string, source: string) {
    this.logger.log('Comparing passwords');
    return bcrypt.compare(target, source);
  }
}
