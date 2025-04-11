export class RegisterDtoRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterDtoResponse {
  access_token: string;
  refresh_token?: string;
}
