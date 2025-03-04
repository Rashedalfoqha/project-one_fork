import { Test, TestingModule } from '@nestjs/testing';
import { LeavesService } from './leaves.service';
import { Repository } from 'typeorm';
import { Leave } from './entities/leave.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';

describe('LeavesService', () => {
  let service: LeavesService;
  let repository: Repository<Leave>;

  const mockLeaveRepository = {
    create: jest.fn().mockImplementation((dto: CreateLeaveDto) => dto),
    save: jest.fn().mockResolvedValue({ leaveId: 1, ...new CreateLeaveDto() }),
    find: jest.fn().mockResolvedValue([{ leaveId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ leaveId: 1 }),
    preload: jest.fn().mockResolvedValue({ leaveId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeavesService,
        { provide: getRepositoryToken(Leave), useValue: mockLeaveRepository },
      ],
    }).compile();

    service = module.get<LeavesService>(LeavesService);
    repository = module.get<Repository<Leave>>(getRepositoryToken(Leave));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new leave', async () => {
      const createLeaveDto: CreateLeaveDto = {
        leaveType: 'Sick',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Pending', 
      };
      const leave = await service.create(createLeaveDto);
      expect(leave).toEqual({ leaveId: 1, ...createLeaveDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of leaves', async () => {
      const leaves = await service.findAll();
      expect(leaves).toEqual([{ leaveId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a leave', async () => {
      const leave = await service.findOne(1);
      expect(leave).toEqual({ leaveId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });

    it('should throw an error if leave is not found', async () => {
      mockLeaveRepository.findOne.mockResolvedValueOnce(undefined);
      await expect(service.findOne(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a leave', async () => {
      const updateLeaveDto: CreateLeaveDto = {
        leaveType: 'Sick',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Approved', 
      };
      const leave = await service.update(1, updateLeaveDto);
      expect(leave).toEqual({ leaveId: 1, ...updateLeaveDto });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw an error if leave is not found', async () => {
      mockLeaveRepository.preload.mockResolvedValueOnce(undefined);
      await expect(service.update(1, new CreateLeaveDto())).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a leave', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });

    it('should throw an error if leave is not found', async () => {
      mockLeaveRepository.delete.mockResolvedValueOnce({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow();
    });
  });
});
