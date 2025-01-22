import { Company } from 'src/Modules/company/entities/company.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('admins') // Represents the "admins" table
export class Admin {
  @PrimaryGeneratedColumn()
  adminId: number; // Auto-incremented primary key for admins

  @Column({ length: 255 })
  name: string; // Admin's name

  @Column({ unique: true, length: 255 })
  email: string; // Admin's unique email address

  @Column({ length: 255 })
  password: string; // Encrypted password for authentication

  @Column({ default: true })
  isActive: boolean; // Whether the admin account is active

  @ManyToOne(() => Company, (company) => company.admins, { onDelete: 'CASCADE' })
  company: Company; // Each admin belongs to one company
}
