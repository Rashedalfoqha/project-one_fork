import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;

  beforeEach(async () => {
    const mockDepartmentsService = {
      create: jest.fn(), // 👈 Define the mock function
      findAll: jest.fn(), // 👈 Also mock findAll
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [{ provide: DepartmentsService, useValue: mockDepartmentsService }], // 👈 Inject the mock service
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    service = module.get<DepartmentsService>(DepartmentsService);
  });

  // ---------------------- Ensure that the controller you want to test is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // ---------------------- Test creation of depatment , with checking of the creation DTO
  it('should create a department', async () => {
    const createDepartmentDto: CreateDepartmentDto = {
      name: 'Finance',
      description: 'Handles financial operations',
    };

    const mockDepartment: Partial<Department> = {
      departmentId: 1,
      name: createDepartmentDto.name,
      description: createDepartmentDto.description,
      employees: [],
    };

    // Ensure the mock service returns the expected department
    jest.spyOn(service, 'create').mockResolvedValue(mockDepartment as Department);

    // Call the controller's create method
    const result = await controller.create(createDepartmentDto);

    // Verify results
    expect(result).toEqual(mockDepartment);
    expect(service.create).toHaveBeenCalledWith(createDepartmentDto);
    expect(service.create).toHaveBeenCalledTimes(1);
  });
// ----------------------------------- get all departments test
  it('should get all departments', async () => {
    const mockDepartments: Department[] = [
      { departmentId: 1, name: 'HR', description: 'Human Resources', employees: [] },
      { departmentId: 2, name: 'Engineering', description: 'Software Development', employees: [] },
      { departmentId: 3, name: 'Marketing', description: 'Marketing & Sales', employees: [] },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockDepartments);

    const result = await controller.findAll();

    expect(result).toEqual(mockDepartments);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
  // ---------------------------------- get one department by id test
  it('should get the department with the provided id in params', async () => {
    const departmentId = 1;
    const mockDepartment  = {
     departmentId:departmentId,
      name: 'HR',
      description: 'Human Resources',
      employees: [],
    } as any
    jest.spyOn(service, 'findOne').mockResolvedValue(mockDepartment);

    const result = await controller.findOne(departmentId.toString());

    expect(result).toEqual(mockDepartment);
    expect(service.findOne).toHaveBeenCalledWith(departmentId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
  })


   // ---------------------------------- update one department by id test
   it('should update the department with the provided id in params', async () => {
    const departmentId = 1;
    const UpdateDepartmentDto: UpdateDepartmentDto = {
      name: 'New Finance',
      description: 'Handles financial operations',
    };

    const mockDepartment: Department = {
      departmentId: 1,
      name: UpdateDepartmentDto.name,
      description: UpdateDepartmentDto.description,
      employees: [],
    };
    jest.spyOn(service, 'update').mockResolvedValue(mockDepartment);

    const result = await controller.update(departmentId.toString(),mockDepartment);

    expect(result).toEqual(mockDepartment);
    expect(service.update).toHaveBeenCalledWith(departmentId,mockDepartment);
    expect(service.update).toHaveBeenCalledTimes(1);
  })
   // ---------------------------------- remove one department by id test


   it('should update the department with the provided id in params', async () => {
    const departmentId = 1;
  

    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const result = await controller.remove(departmentId.toString());

    expect(result).toEqual(undefined);
    expect(service.remove).toHaveBeenCalledWith(departmentId);
    expect(service.remove).toHaveBeenCalledTimes(1);
  })

});
