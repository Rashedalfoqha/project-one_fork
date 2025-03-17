import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let repository: Repository<Employee>;

  const mockEmployeeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    repository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Create test
  it('should create a new employee', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      employeeId: 1,
      name: 'John Doe',
      email: 'random@gmail.com',
      phone: '1234567890',
      address: '123, Random Street',
      hireDate: new Date(),
      position: 'Software Engineer',
      salary: 1000,
    };
    const savedEmployee = {
      employeeId: 1,
      ...createEmployeeDto,
    };
    mockEmployeeRepository.create.mockReturnValue(createEmployeeDto);
    mockEmployeeRepository.save.mockResolvedValue(savedEmployee);
    const result = await service.create(createEmployeeDto);
    expect(result).toEqual(savedEmployee);
  });
  // find one test
  it('should throw an Error if leave is not found', async () => {
    mockEmployeeRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException); // ✅ Now this will pass
  });
  // update test
  it('should update an employee', async () => {
    const updateEmployeeDto: CreateEmployeeDto = {
      employeeId: 1,
      name: 'Johnss Doe',
      email: 'randomss@gmail.com',
      phone: '123456789110',
      address: '123, Random ssStreet',
      hireDate: new Date(),
      position: 'Softwaress Engineer',
      salary: 1001,
    };
    const existingEmployee = {
      employeeId: 1,
      ...updateEmployeeDto,
    };
    mockEmployeeRepository.preload.mockResolvedValue(existingEmployee);
    mockEmployeeRepository.save.mockResolvedValue(existingEmployee);
    const result = await service.update(1, updateEmployeeDto);
    expect(result).toEqual(existingEmployee);
    expect(mockEmployeeRepository.save).toHaveBeenCalledWith(existingEmployee);
  });
  // update test
  it('should throw an Error if evaluation is not found', async () => {
    mockEmployeeRepository.preload.mockResolvedValueOnce(undefined);
    await expect(service.update(1, {} as CreateEmployeeDto)).rejects.toThrow(
      NotFoundException,
    );
  });
  it('should remove a evaluation', async () => {
    mockEmployeeRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove(1)).rejects.toThrow(Error);
  });
});
