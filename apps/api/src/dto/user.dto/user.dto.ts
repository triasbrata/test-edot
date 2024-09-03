export enum LoginType {
  PHONE = 'phone',
  EMAIL = 'email',
}
export class LoginDto {
  type: LoginType;
  identity: string;
  password: string;
}
