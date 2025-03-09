import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsNumber,
  IsPositive,
  isNumber,
  isNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmployeeDto {
  employeeId: number; // Employee ID
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string; // Employee name

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string; // Employee email

  @IsPhoneNumber(null, { message: 'Phone must be a valid phone number' }) // `null` can be used for any region
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string; // Employee phone number

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string; // Employee address

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Hire date must be a valid date' })
  hireDate: Date; // Employee hire date

  @IsString({ message: 'Position must be a string' })
  @IsNotEmpty({ message: 'Position is required' })
  position: string; // Employee position

  @IsNumber({}, { message: 'Salary must be a valid number' })
  @IsPositive({ message: 'Salary must be a positive number' })
  salary: number; // Employee salary
}
