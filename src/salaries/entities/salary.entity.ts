import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('salaries') // Represents the "salaries" table
export class Salary {
  @PrimaryGeneratedColumn()
  salaryId: number; // Auto-incremented primary key

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseSalary: number; // Base salary

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deductions: number; // Deductions (default is 0)

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allowances: number; // Allowances (default is 0)

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netSalary: number; // Final salary after deductions and allowances

  @Column({ type: 'date' })
  paymentDate: Date; // Payment date

  @ManyToOne(() => Employee, (employee) => employee.salaries)
  employee: Employee; // Relation to "Employee" table
}