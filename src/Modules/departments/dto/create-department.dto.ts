import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @IsString({ message: 'Department name must be a string' })
  @IsNotEmpty({ message: 'Department name is required' })
  name: string; // Department name

  @IsString({ message: 'Description must be a string' })
  @IsOptional() // Description is optional
  description?: string; // Department description (optional)
}
