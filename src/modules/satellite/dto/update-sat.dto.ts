import { IsOptional, IsString } from 'class-validator';

export class UpdateSatDto {
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
  @IsString()
  launchDate?: string;
}
