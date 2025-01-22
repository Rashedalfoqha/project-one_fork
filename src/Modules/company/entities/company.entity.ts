import { Admin } from 'src/Modules/admin/entities/admin.entity';
import { Location } from 'src/Modules/location/entities/location.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('companies') // Represents the "companies" table
export class Company {
  @PrimaryGeneratedColumn()
  companyId: number; // Auto-incremented primary key for companies

  @Column({ length: 255 })
  name: string; // Company name

  @Column({ length: 255 })
  address: string; // Company address

  @Column({ unique: true, length: 15 })
  phone: string; // Company phone number

  @Column({ unique: true, length: 255 })
  email: string; // Company email address

  @Column({ length: 255, nullable: true })
  website: string; // Optional website URL

  @OneToMany(() => Admin, (admin) => admin.company)
  admins: Admin[]; // A company can have multiple admins

  @OneToOne(() => Location, (location) => location.company)
  location: Location;
}
