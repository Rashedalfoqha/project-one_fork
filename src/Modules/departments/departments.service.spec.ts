import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { NotFoundException } from '@nestjs/common';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let repository: Repository<Department>;
  const mockDepartmentRepository = {
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
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    repository = module.get<Repository<Department>>(
      getRepositoryToken(Department),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //create test
  it('should create a new department', async () => {
    const createDepartmentDto: CreateDepartmentDto = {
      departmentId: 1,
      departmentName: 'IT',
      description: 'Information Technology',
      companyId: 1,
    };
    const savedDepartment = {
      departmentId: 1,
      ...createDepartmentDto,
    };

    mockDepartmentRepository.create.mockReturnValue(createDepartmentDto);
    mockDepartmentRepository.save.mockResolvedValue(savedDepartment);

    const result = await service.create(createDepartmentDto);
    expect(result).toEqual(savedDepartment);
    expect(mockDepartmentRepository.create).toHaveBeenCalledWith(
      createDepartmentDto,
    );
    expect(mockDepartmentRepository.save).toHaveBeenCalledWith(
      createDepartmentDto,
    );
  });
  // find one test
  it('should throw an Error if department is not found', async () => {
    mockDepartmentRepository.findOne.mockResolvedValueOnce(null);
  
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });
// upddate test
it ('should update a department', async () => {
  const updateDepartmentDto: UpdateDepartmentDto = {
    departmentId: 1,
    departmentName: 'Ifd',
    description: 'Informatssa Technology',
    companyId: 1,
  };
  const updatedDepartment = {
    departmentId: 1,
    ...updateDepartmentDto,
  };

  mockDepartmentRepository.preload.mockResolvedValue(updatedDepartment);
  mockDepartmentRepository.save.mockResolvedValue(updatedDepartment);

  const result = await service.update(1, updateDepartmentDto);
  expect(result).toEqual(updatedDepartment);
  expect(mockDepartmentRepository.preload).toHaveBeenCalledWith({
    departmentId: 1,
    ...updateDepartmentDto,
  });
  expect(mockDepartmentRepository.save).toHaveBeenCalledWith(updatedDepartment);  
} );
// update test (failure case)   
it('should throw an Error if department is not found', async () => {
  mockDepartmentRepository.preload.mockResolvedValueOnce(undefined);
  await expect(service.update(1, {} as UpdateDepartmentDto)).rejects.toThrow(NotFoundException);
});
// delete test
it('should delete a department', async () => {
  mockDepartmentRepository.delete.mockResolvedValue({ affected: 0 });
  await expect(service.remove(1)).rejects.toThrow(Error);
});
});
