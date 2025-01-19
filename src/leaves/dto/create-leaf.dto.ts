export class CreateLeaveDto {
  leaveType: 'Annual' | 'Sick' | 'Emergency'; // Type of leave

  startDate: Date; // Start date of the leave

  endDate: Date; // End date of the leave

  status: 'Pending' | 'Approved' | 'Rejected'; // Status of the leave
}
