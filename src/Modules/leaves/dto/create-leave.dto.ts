import { IsDate, IsEnum, Validate } from 'class-validator';

export class CreateLeaveDto {
  @IsEnum(['Annual', 'Sick', 'Emergency'], {
    message: 'Leave type must be either Annual, Sick, or Emergency',
  })
  leaveType: 'Annual' | 'Sick' | 'Emergency'; // Type of leave

  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date; // Start date of the leave

  @Validate(
    (object: CreateLeaveDto, value: Date) => {
      if (value < object.startDate) {
        return false;
      }
      return true;
    },
    { message: 'End date cannot be earlier than start date' },
  )
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date; // End date of the leave

  @IsEnum(['Pending', 'Approved', 'Rejected'], {
    message: 'Status must be either Pending, Approved, or Rejected',
  })
  status: 'Pending' | 'Approved' | 'Rejected'; // Status of the leave
}
