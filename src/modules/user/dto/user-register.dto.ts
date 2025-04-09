import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsEmail()
  email: string;
}
