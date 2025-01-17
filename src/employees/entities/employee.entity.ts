import { Department } from 'src/departments/entities/department.entity';
import { Evaluation } from 'src/evaluations/entities/evaluation.entity';
import { Leave } from 'src/leaves/entities/leaf.entity';
import { Salary } from 'src/salaries/entities/salary.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity('employees') // Represents the "employees" table
export class Employee {
  @PrimaryGeneratedColumn()
  employeeId: number; // Auto-incremented primary key

  @Column({ length: 255 })
  name: string; // Employee's name

  @Column({ unique: true, length: 255 })
  email: string; // Unique email

  @Column({ length: 15, nullable: true })
  phone: string; // Phone number (optional)

  @Column({ type: 'text', nullable: true })
  address: string; // Address (optional)

  @Column({ type: 'date' })
  hireDate: Date; // Hiring date

  @Column({ length: 100 })
  position: string; // Job title

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number; // Base salary

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department; // Relation to "Department" table

  @OneToMany(() => Salary, (salary) => salary.employee)
  salaries: Salary[]; // One employee can have multiple salary records

  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves: Leave[]; // One employee can have multiple leave requests

  @OneToMany(() => Evaluation, (evaluation) => evaluation.employee)
  evaluations: Evaluation[]; // One employee can have multiple evaluations
}