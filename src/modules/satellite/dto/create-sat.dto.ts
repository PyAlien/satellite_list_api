import { IsString } from 'class-validator';

export class CreateSaDto {
  @IsString()
  name: string;
}
