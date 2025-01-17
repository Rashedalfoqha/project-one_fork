import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('leaves') // Represents the "leaves" table
export class Leave {
  @PrimaryGeneratedColumn()
  leaveId: number; // Auto-incremented primary key

  @Column({ type: 'enum', enum: ['Annual', 'Sick', 'Emergency'], default: 'Annual' })
  leaveType: 'Annual' | 'Sick' | 'Emergency'; // Type of leave

  @Column({ type: 'date' })
  startDate: Date; // Start date of leave

  @Column({ type: 'date' })
  endDate: Date; // End date of leave

  @Column({ type: 'enum', enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' })
  status: 'Pending' | 'Approved' | 'Rejected'; // Leave status

  @ManyToOne(() => Employee, (employee) => employee.leaves)
  employee: Employee; // Relation to "Employee" table
}
