/* import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { Admin, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

describe('AdminService', () => {
  let service: AdminService;
  let repository: Repository<Admin>;
  const mockAdminRepository = {
    create: jest.fn().mockImplementation((dto: CreateAdminDto) => dto),
    save: jest.fn().mockResolvedValue({ adminId: 1, ...new CreateAdminDto() }),
    find: jest.fn().mockResolvedValue([{ adminId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ adminId: 1 }),
    preload: jest.fn().mockResolvedValue({ adminId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

describe('AdminService', () => {
  let service: AdminService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Admin>;

  const mockAdminRepository = {
    create: jest.fn().mockImplementation((dto: CreateAdminDto) => dto),
    save: jest
      .fn()
      .mockResolvedValue({
        adminId: 1,
        name: 'Admin Name',
        email: 'admin@example.com',
      }),
    find: jest.fn().mockResolvedValue([{ adminId: 1, name: 'Admin Name' }]),
    findOne: jest.fn().mockResolvedValue({ adminId: 1, name: 'Admin Name' }),
    preload: jest.fn().mockResolvedValue({ adminId: 1, name: 'Admin Name' }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Admin),
          useValue: mockAdminRepository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    repository = module.get<Repository<Admin>>(getRepositoryToken(Admin));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
