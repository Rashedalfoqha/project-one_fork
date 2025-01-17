import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('evaluations') // Represents the "evaluations" table
export class Evaluation {
  @PrimaryGeneratedColumn()
  evaluationId: number; // Auto-incremented primary key

  @Column({ type: 'int' })
  qualityScore: number; // Work quality score

  @Column({ type: 'int' })
  commitmentScore: number; // Commitment score

  @Column({ type: 'int' })
  skillsScore: number; // Skills score

  @Column({ type: 'text', nullable: true })
  comments: string; // Optional comments

  @Column({ type: 'date' })
  evaluationDate: Date; // Date of evaluation

  @ManyToOne(() => Employee, (employee) => employee.evaluations)
  employee: Employee; // Relation to "Employee" table
}
