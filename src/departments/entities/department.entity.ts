import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('departments') // Represents the "departments" table
export class Department {
  @PrimaryGeneratedColumn()
  departmentId: number; // Auto-incremented primary key

  @Column({ length: 100 })
  name: string; // Department name

  @Column({ type: 'text', nullable: true })
  description: string; // Description (optional)

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
