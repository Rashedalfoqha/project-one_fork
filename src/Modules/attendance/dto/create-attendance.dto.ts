import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty({ message: 'Check-in time is required' }) // Ensures it's not empty
  checkInTime: string;

  @IsString()
  @IsNotEmpty({ message: 'Check-out time is required' }) // Ensures it's not empty
  checkOutTime: string;

  @IsDate({ message: 'Attendance date must be a valid date' }) // Validates it as a Date object
  @Type(() => Date)
  attendanceDate: Date;
}
