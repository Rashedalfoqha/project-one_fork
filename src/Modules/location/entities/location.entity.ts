import { Company } from 'src/Modules/company/entities/company.entity';
import { Employee } from 'src/Modules/employees/entities/employee.entity';
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
  locationId: number;
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
