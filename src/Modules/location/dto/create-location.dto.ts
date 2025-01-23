import { IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude: number; // Latitude of the location

  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude: number; // Longitude of the location

  @IsNumber({}, { message: 'Radius must be a number' })
  radius: number; // Radius (in meters or other unit) of the location
}
