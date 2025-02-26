import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Import entities
import { Employee } from '../Modules/employees/entities/employee.entity';
import { Attendance } from '../Modules/attendance/entities/attendance.entity';
import { Evaluation } from '../Modules/evaluations/entities/evaluation.entity';
import { Department } from '../Modules/departments/entities/department.entity';
import { Leave } from '../Modules/leaves/entities/leave.entity';
import { Salary } from '../Modules/salaries/entities/salary.entity';
import { Location } from '../Modules/location/entities/location.entity';
import { Company } from '../Modules/company/entities/company.entity';
import { Admin } from '../Modules/admin/entities/admin.entity';
// Import DTOs
import { CreateEmployeeDto } from 'src/Modules/employees/dto/create-employee.dto';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
   
  ) {}

  async seed() {
    const shouldSeed = process.env.SEED_DB === 'true';
    if (!shouldSeed) return; // Skip seeding if SEED_DB is false or undefined

    console.log('🌱 Seeding database with dummy data...');

    // Check if data already exists dons't add new , if tables are empty , add dummy data
    const employeeCount = await this.employeeRepository.count();
    if (employeeCount > 0) {
      console.log('✅ Database already has data. Skipping seed.');
      return;
    }

    // Insert dummy data

    const dummyEmployees: CreateEmployeeDto[] = [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+962791234567',
          address: '123 Main Street, Amman, Jordan',
          hireDate: new Date('2023-06-15'),
          position: 'Software Engineer',
          salary: 2500.0,
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+962792345678',
          address: '456 Elm Street, Zarqa, Jordan',
          hireDate: new Date('2022-10-10'),
          position: 'Project Manager',
          salary: 4000.0,
        },
        {
          name: 'Ali Hassan',
          email: 'ali.hassan@example.com',
          phone: '+962793456789',
          address: '789 Pine Street, Irbid, Jordan',
          hireDate: new Date('2021-05-20'),
          position: 'HR Manager',
          salary: 3000.0,
        },
        {
          name: 'Sara Khalil',
          email: 'sara.khalil@example.com',
          phone: '+962794567890',
          address: '101 Cedar Street, Aqaba, Jordan',
          hireDate: new Date('2020-09-05'),
          position: 'Marketing Specialist',
          salary: 2800.0,
        },
        {
          name: 'Omar Nasser',
          email: 'omar.nasser@example.com',
          phone: '+962795678901',
          address: '222 Olive Street, Madaba, Jordan',
          hireDate: new Date('2024-01-02'),
          position: 'Business Analyst',
          salary: 3200.0,
        },
      ];
  
      // Save all dummy employees
      await this.employeeRepository.save(dummyEmployees);
  
      console.log('✅ Dummy employee data inserted successfully!');
    }
}
