export class CreateSalaryDto {
  baseSalary: number;

  deductions: number;

  allowances: number;

  netSalary: number;

  paymentDate: Date;
}
