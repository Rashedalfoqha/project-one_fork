import { Test, TestingModule } from '@nestjs/testing';
import { SalariesService } from './salaries.service';
import { Repository } from 'typeorm';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { NotFoundException } from '@nestjs/common';

describe('SalariesService', () => {
  let service: SalariesService;
  let repository: Repository<Salary>;

  const mockSalaryRepository = {
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
        SalariesService,
        {
          provide: getRepositoryToken(Salary),
          useValue: mockSalaryRepository,
        },
      ],
    }).compile();

    service = module.get<SalariesService>(SalariesService);
    repository = module.get<Repository<Salary>>(getRepositoryToken(Salary));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //create test
  it('should create a new salary', async () => {
    const createSalaryDto: CreateSalaryDto = {
      salaryId: 1,
      baseSalary: 1000,
      deductions: 1000,
      paymentDate: new Date(),
      netSalary: 1000,
      allowances: 1000,
    };
    const savedSalary = {
      salaryId: 1,
      ...createSalaryDto,
    };

    mockSalaryRepository.create.mockReturnValue(createSalaryDto);
    mockSalaryRepository.save.mockResolvedValue(savedSalary);

    const result = await service.create(createSalaryDto);
    expect(result).toEqual(savedSalary);
    expect(repository.create).toHaveBeenCalledWith(createSalaryDto);
    expect(repository.save).toHaveBeenCalledWith(createSalaryDto);
  });
  it('should throw an Error if salary is not found', async () => {
    mockSalaryRepository.findOne.mockResolvedValueOnce(undefined); // Ensure undefined is returned

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException); // Ensure the correct error type
  });

  // update test
  it('should update a salary', async () => {
    const updateSalaryDto: UpdateSalaryDto = {
      salaryId: 1,
      baseSalary: 1000,
      deductions: 1000,
      paymentDate: new Date(),
      netSalary: 1000,
      allowances: 1000,
    };
    const existingSalary = { salaryId: 1, ...updateSalaryDto };
    mockSalaryRepository.preload.mockResolvedValue(existingSalary);
    mockSalaryRepository.save.mockResolvedValue(existingSalary);
    const result = await service.update(1, updateSalaryDto);
    expect(result).toEqual(existingSalary);
    expect(repository.preload).toHaveBeenCalledWith({
      salaryId: 1,
      ...updateSalaryDto,
    });
    expect(repository.save).toHaveBeenCalledWith(existingSalary);
  });
  // update test (failure case)
  it('should throw an Error if salary is not found', async () => {
    mockSalaryRepository.preload.mockResolvedValueOnce(undefined);
    await expect(service.update(1, {} as UpdateSalaryDto)).rejects.toThrow(
      NotFoundException,
    );
  });
  // delete test
  it('should delete a salary', async () => {
    mockSalaryRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove(1)).rejects.toThrow(Error);
  });
});
