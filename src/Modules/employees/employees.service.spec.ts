import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let repository: Repository<Employee>;

  const mockEmployeeRepository = {
    create: jest.fn().mockImplementation((dto: CreateEmployeeDto) => dto),
    save: jest.fn().mockResolvedValue({ employeeId: 1, ...new CreateEmployeeDto() }),
    find: jest.fn().mockResolvedValue([{ employeeId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ employeeId: 1 }),
    preload: jest.fn().mockResolvedValue({ employeeId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
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

  describe('create', () => {
    it('should create a new employee', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '0599999999',
        address: 'Amman',
        position: 'Software Engineer',
        salary: 1000,
        hireDate: new Date(),
      };

      const employee = await service.create(createEmployeeDto);
      expect(employee).toEqual({ employeeId: 1, ...createEmployeeDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const employees = await service.findAll();
      expect(employees).toEqual([{ employeeId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an employee', async () => {
      const employee = await service.findOne(1);
      expect(employee).toEqual({ employeeId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });

    it('should throw an error if employee is not found', async () => {
      mockEmployeeRepository.findOne.mockResolvedValueOnce(undefined);
      await expect(service.findOne(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const updateEmployeeDto: Partial<CreateEmployeeDto> = {
        position: 'Senior Developer',
        salary: 1500,
      };

      const employee = await service.update(1, updateEmployeeDto);
      expect(employee).toEqual({ employeeId: 1, ...updateEmployeeDto });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw an error if employee is not found', async () => {
      mockEmployeeRepository.preload.mockResolvedValueOnce(undefined);
      await expect(service.update(1, {})).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });

    it('should throw an error if employee is not found', async () => {
      mockEmployeeRepository.delete.mockResolvedValueOnce({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow();
    });
  });
});
