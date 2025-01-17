import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('attendance') 
export class Attendance {
  @PrimaryGeneratedColumn()
  attendanceId: number; 

  @Column({ type: 'time' })
  checkInTime: string; 

  @Column({ type: 'time' })
  checkOutTime: string; 

  @Column({ type: 'date' })
  attendanceDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.employeeId)
  employee: Employee;
}
