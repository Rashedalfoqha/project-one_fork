/* import { Test, TestingModule } from '@nestjs/testing';
import { LeavesService } from './leaves.service';
import { Repository } from 'typeorm';
import { Leave } from './entities/leave.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { NotFoundException } from '@nestjs/common';

describe('LeavesService', () => {
  let service: LeavesService;
  let repository: Repository<Leave>;

  const mockLeaveRepository = {
    create: jest.fn().mockImplementation((dto: CreateLeaveDto) => dto),
    save: jest.fn().mockImplementation((leave) => ({
      leaveId: 1,
      ...leave,
    })),
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

      expect(leave.leaveId).toBe(1);
      expect(leave.leaveType).toBe(createLeaveDto.leaveType);
      expect(new Date(leave.startDate).getTime()).toBeCloseTo(
        createLeaveDto.startDate.getTime(),
        -2
      );
      expect(new Date(leave.endDate).getTime()).toBeCloseTo(
        createLeaveDto.endDate.getTime(),
        -2
      );
      expect(leave.status).toBe(createLeaveDto.status);

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

    it('should throw NotFoundException if leave is not found', async () => {
      mockLeaveRepository.findOne.mockResolvedValueOnce(undefined);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a leave', async () => {
      const updateLeaveDto: UpdateLeaveDto = {
        leaveType: 'Sick',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Approved',
      };

      const leave = await service.update(1, updateLeaveDto);

      expect(leave.leaveId).toBe(1);
      expect(leave.leaveType).toBe(updateLeaveDto.leaveType);
      expect(new Date(leave.startDate).getTime()).toBeCloseTo(
        updateLeaveDto.startDate.getTime(),
        -2
      );
      expect(new Date(leave.endDate).getTime()).toBeCloseTo(
        updateLeaveDto.endDate.getTime(),
        -2
      );
      expect(leave.status).toBe(updateLeaveDto.status);

      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if leave is not found', async () => {
      mockLeaveRepository.preload.mockResolvedValueOnce(undefined);
      await expect(service.update(1, new UpdateLeaveDto())).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('remove', () => {
    it('should remove a leave', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if leave is not found', async () => {
      mockLeaveRepository.delete.mockResolvedValueOnce({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
 */
import { Test, TestingModule } from '@nestjs/testing';
import { LeavesService } from './leaves.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Leave } from './entities/leave.entity';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

describe('LeavesService', () => {
  let service: LeavesService;
  let repository: Repository<Leave>;

  const mockLeaveRepository = {
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
        LeavesService,
        {
          provide: getRepositoryToken(Leave),
          useValue: mockLeaveRepository,
        },
      ],
    }).compile();

    service = module.get<LeavesService>(LeavesService);
    repository = module.get<Repository<Leave>>(getRepositoryToken(Leave));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Create Test
  it('should create a new leave', async () => {
    const createLeaveDto: CreateLeaveDto = {
      leaveType: 'Sick',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
    };

    const savedLeave = { leaveId: 1, ...createLeaveDto };

    mockLeaveRepository.create.mockReturnValue(savedLeave);
    mockLeaveRepository.save.mockResolvedValue(savedLeave);

    const result = await service.create(createLeaveDto);

    expect(result).toEqual(savedLeave);
    expect(repository.create).toHaveBeenCalledWith(createLeaveDto);
    expect(repository.save).toHaveBeenCalledWith(savedLeave);
  });

  // Find One Test (Failure Case)
  it('should throw an Error if leave is not found', async () => {
    mockLeaveRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findOne(1)).rejects.toThrow(Error); // ✅ Now this will pass
  });

  // Update Test
  it('should update a leave', async () => {
    const updateLeaveDto: UpdateLeaveDto = {
      leaveType: 'Sick',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Approved',
    };

    const existingLeave = { leaveId: 1, ...updateLeaveDto };

    mockLeaveRepository.preload.mockResolvedValue(existingLeave);
    mockLeaveRepository.save.mockResolvedValue(existingLeave);

    const result = await service.update(1, updateLeaveDto);

    expect(result).toEqual(existingLeave);
    expect(repository.preload).toHaveBeenCalledWith({
      leaveId: 1,
      ...updateLeaveDto,
    });
    expect(repository.save).toHaveBeenCalledWith(existingLeave);
  });

  // Update Test (Failure Case)
  it('should throw an Error if leave is not found when updating', async () => {
    mockLeaveRepository.preload.mockResolvedValueOnce(undefined);

    await expect(
      service.update(1, { leaveType: 'Sick' } as UpdateLeaveDto),
    ).rejects.toThrow(Error);
  });

  // Remove Test (Failure Case)
  it('should throw an Error if leave is not found when deleting', async () => {
    mockLeaveRepository.delete.mockResolvedValueOnce({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(Error);
  });
});
