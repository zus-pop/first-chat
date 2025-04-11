import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDtoRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginDtoResponse {
  access_token: string;
  refresh_token?: string;
}
