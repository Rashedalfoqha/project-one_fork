import { Test, TestingModule } from '@nestjs/testing';
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
