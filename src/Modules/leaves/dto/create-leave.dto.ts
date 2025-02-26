export class CreateLeaveDto {
  leaveType: 'Annual' | 'Sick' | 'Emergency';
  startDate: Date;
  endDate: Date;
  status?: 'Pending' | 'Approved' | 'Rejected';
}
