import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Evaluation } from 'src/evaluations/entities/evaluation.entity';
import { Leave } from 'src/leaves/entities/leaf.entity';
import { Location } from 'src/location/entities/location.entity';
import { Salary } from 'src/salaries/entities/salary.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity('employees') // Represents the "employees" table
export class Employee {
  @PrimaryGeneratedColumn()
  employeeId: number; // Auto-incremented primary key

  @Column({ length: 255 })
  name: string; // Employee's name

  @Column({ unique: true, length: 255 })
  email: string; // Unique email

  @Column({ length: 10, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ length: 100 })
  position: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;

  @OneToMany(() => Salary, (salary) => salary.employee)
  salaries: Salary[];

  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves: Leave[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.employee)
  evaluations: Evaluation[];

  @OneToOne((attendance) => attendance.employee)
  attendance: Attendance[];
  @OneToOne(() => Location, (location) => location.employee)
  location: Location;
}
