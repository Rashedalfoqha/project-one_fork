import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  name: string; // Company name

  @IsString()
  @IsNotEmpty({ message: 'Company address is required' })
  address: string; // Company address

  @IsString()
  @IsNotEmpty({ message: 'Company phone number is required' })
  @Matches(
    '^[+]*[0-9]{1,4}?[-\\s./0-9]*$',
    '', // Empty string here to skip `modifiers` argument
    {
      message: 'Phone number must be a valid phone number', // This is the validation message
    },
  )
  phone: string; // Company phone number

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Company email is required' })
  email: string; // Company email

  @IsString()
  @IsOptional() // Website is optional
  @Matches(
    '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?.*$',
    '', // Empty string for modifiers
    { message: 'Website must be a valid URL' },
  )
  website?: string; // Company website (optional)
}
