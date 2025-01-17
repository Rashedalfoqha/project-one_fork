import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('attendance') // Represents the "attendance" table
export class Attendance {
  @PrimaryGeneratedColumn()
  attendanceId: number; // Auto-incremented primary key

  @Column({ type: 'time' })
  checkInTime: string; // Check-in time

  @Column({ type: 'time', nullable: true })
  checkOutTime: string; // Check-out time (optional)

  @Column({ type: 'date' })
  attendanceDate: Date; // Attendance date

  @ManyToOne(() => Employee, (employee) => employee.attendance)
  employee: Employee; 
}
