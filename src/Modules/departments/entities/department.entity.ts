import { Employee } from 'src/Modules/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('departments') 
export class Department {
  @PrimaryGeneratedColumn()
  departmentId: number; 

  @Column({ length: 100 })
  name: string; 

  @Column({ type: 'text', nullable: true })
  description: string; 

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
