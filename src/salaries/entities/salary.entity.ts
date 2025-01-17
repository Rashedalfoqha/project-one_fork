import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('salaries') 
export class Salary {
  @PrimaryGeneratedColumn()
  salaryId: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseSalary: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deductions: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  allowances: number; 

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netSalary: number; 

  @Column({ type: 'date' })
  paymentDate: Date; 

  @ManyToOne(() => Employee, (employee) => employee.salaries)
  employee: Employee; 
}