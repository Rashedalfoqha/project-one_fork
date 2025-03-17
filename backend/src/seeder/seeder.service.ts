import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import {TypeOrmModule} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
// import { Module } from '@nestjs/common';
// Import entities
import { Employee } from '../Modules/employees/entities/employee.entity';
import { Department } from '../Modules/departments/entities/department.entity';
// Import DTOs
import { CreateEmployeeDto } from 'src/Modules/employees/dto/create-employee.dto';
import { CreateDepartmentDto } from 'src/Modules/departments/dto/create-department.dto';


// @Module({
//   imports: [TypeOrmModule.forFeature([Employee, Department])], // Register repositories
//   providers: [SeederService], // Make SeederService available
//   exports: [SeederService], // Export it for use in AppModule or other modules
// })
@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async seed() {
    // Check if seeding is enabled in the environment variables
    if (process.env.SEED_DB !== 'true') return;

    console.log('🌱 Seeding database with dummy data...');

    await this.seedDepartments(); // Seed departments first (needed for employee relationships)
    await this.seedEmployees(); // Seed employees

    console.log('✅ Seeding completed successfully!');
  }

  private async seedDepartments() {
    // Check if departments already exist
    const departmentCount = await this.departmentRepository.count();
    if (departmentCount > 0) {
      console.log('✅ Departments already exist. Skipping department seed.');
      return;
    }

    const dummyDepartments: CreateDepartmentDto[] = [
      { name: 'Human Resources', description: 'Handles employee relations and benefits.' },
      { name: 'Engineering', description: 'Develops and maintains software solutions.' },
      { name: 'Marketing', description: 'Manages branding and advertising efforts.' },
      { name: 'Finance', description: 'Handles budgeting and financial planning.' },
      { name: 'Customer Support', description: 'Assists customers with inquiries and issues.' },
    ];

    await this.departmentRepository.save(dummyDepartments);
    console.log('✅ Dummy department data inserted successfully!');
  }

  private async seedEmployees() {
    // Check if employees already exist
    const employeeCount = await this.employeeRepository.count();
    if (employeeCount > 0) {
      console.log('✅ Employees already exist. Skipping employee seed.');
      return;
    }

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

    await this.employeeRepository.save(dummyEmployees);
    console.log('✅ Dummy employee data inserted successfully!');
  }
}
