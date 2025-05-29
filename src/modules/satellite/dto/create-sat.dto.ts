import { IsDateString, IsString } from 'class-validator';

export class CreateSatDto {
  @IsString()
  name: string;

  @IsString()
  orbitalLocation: string;

  @IsString()
  status: string;

  @IsDateString()
  launchDate: string;
}
