import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('evaluations') 
export class Evaluation {
  @PrimaryGeneratedColumn()
  evaluationId: number; 

  @Column({ type: 'int' })
  qualityScore: number; 

  @Column({ type: 'int' })
  commitmentScore: number; 

  @Column({ type: 'int' })
  skillsScore: number; 

  @Column({ type: 'text', nullable: true })
  comments: string; 

  @Column({ type: 'date' })
  evaluationDate: Date; 

  @ManyToOne(() => Employee, (employee) => employee.evaluations)
  employee: Employee; }
