import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let repository: Repository<Department>;
  const mockDepartmentRepository = {
    create: jest.fn().mockImplementation((dto: CreateDepartmentDto) => dto),
    save: jest
      .fn()
      .mockResolvedValue({ departmentId: 1, ...new CreateDepartmentDto() }),
    find: jest.fn().mockResolvedValue([{ departmentId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ departmentId: 1 }),
    preload: jest.fn().mockResolvedValue({ departmentId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new department', async () => {
      const createDepartmentDto: CreateDepartmentDto = {
        name: 'HR',
        description: 'Human Resource',
      };
      const department = await service.create(createDepartmentDto);
      expect(department).toEqual({ departmentId: 1, ...createDepartmentDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('findAll', () => {
    it('should return an array of departments', async () => {
      const departments = await service.findAll();
      expect(departments).toEqual([{ departmentId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a department', async () => {
      const department = await service.findOne(1);
      expect(department).toEqual({ departmentId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update a department', async () => {
      const updateDepartmentDto: CreateDepartmentDto = {
        name: 'HR',
        description: 'Human Resource',
      };
      const department = await service.update(1, updateDepartmentDto);
      expect(department).toEqual({ departmentId: 1, ...updateDepartmentDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('remove', () => {
    it('should delete a department', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
