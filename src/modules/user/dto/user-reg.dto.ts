import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}
