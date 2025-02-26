import { Test, TestingModule } from '@nestjs/testing';
import { SalariesService } from './salaries.service';
import { Repository } from 'typeorm';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';

describe('SalariesService', () => {
  let service: SalariesService;
  let repository: Repository<Salary>;

  const mockSalaryRepository = {
    create: jest.fn().mockImplementation((dto: CreateSalaryDto) => dto),
    save: jest
      .fn()
      .mockResolvedValue({ salaryId: 1, ...new CreateSalaryDto() }),
    find: jest.fn().mockResolvedValue([{ salrayId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ salaryId: 1 }),
    preload: jest
      .fn()
      .mockResolvedValue({
        salaryId: 1,
        baseSalary: 1000,
        deductions : 100,
        allowances : 100,
        netSalary   : 1000,
        paymentDate : new Date(),
      }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalariesService, {
                provide: getRepositoryToken(Salary),
                useValue: mockSalaryRepository,
              },],
    }).compile();

    service = module.get<SalariesService>(SalariesService);
        repository = module.get<Repository<Salary>>(getRepositoryToken(Salary));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => { 
    it('should create a new salary', async () => {
      const createSalaryDto: CreateSalaryDto = {
        baseSalary: 1000,
        deductions: 100,
        allowances: 100,
        netSalary: 1000,
        paymentDate: new Date(),
      };
      const salary = await service.create(createSalaryDto);
      expect(salary).toEqual({ salaryId: 1, ...createSalaryDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('findAll', () => {
    it('should return all salaries', async () => {
      const salaries = await service.findAll();
      expect(salaries).toEqual([{ salaryId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a salary by ID', async () => {
      const salary = await service.findOne(1);
      expect(salary).toEqual({ salaryId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update a salary', async () => {
      const updateSalaryDto = {
        baseSalary: 1000,
        deductions: 100,
        allowances: 100,
        netSalary: 1000,
        paymentDate: new Date(),
      };
      const salary = await service.update(1, updateSalaryDto);
      expect(salary).toEqual({ salaryId: 1, ...updateSalaryDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('remove', () => {
    it('should remove a salary', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    }); 
  });
  
});
