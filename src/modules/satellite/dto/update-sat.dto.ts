import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateSaDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  orbitalLocation?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  launchDate?: string;
}
