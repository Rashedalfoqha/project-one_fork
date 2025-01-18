import { Company } from 'src/company/entities/company.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  locationId: Number;
  @Column()
  latitude: string;
  @Column()
  longitude: string;
  @Column()
  radis: string;
  @OneToOne(() => Company, (company) => company.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  company: Company;

  @OneToOne(() => Employee, (employee) => employee.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employee: Employee;
}
