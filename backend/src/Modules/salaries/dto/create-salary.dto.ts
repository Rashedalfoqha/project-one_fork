import { IsDate, IsNumber } from 'class-validator';

export class CreateSalaryDto {
  salaryId: number; // Salary ID
  @IsNumber({}, { message: 'Base salary must be a number' })
  baseSalary: number; // Base salary

  @IsNumber({}, { message: 'Deductions must be a number' })
  deductions: number; // Deductions

  @IsNumber({}, { message: 'Allowances must be a number' })
  allowances: number; // Allowances

  @IsNumber({}, { message: 'Net salary must be a number' })
  netSalary: number; // Net salary (baseSalary - deductions + allowances)

  @IsDate({ message: 'Payment date must be a valid date' })
  paymentDate: Date; // The payment date for the salary
}
