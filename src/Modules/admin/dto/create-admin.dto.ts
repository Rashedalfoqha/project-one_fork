import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive: boolean;
}
