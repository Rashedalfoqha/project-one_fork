import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let repository: Repository<Attendance>;
  const mockAttendanceRepository = {
    create: jest.fn().mockImplementation((dto: CreateAttendanceDto) => dto),
    save: jest
      .fn()
      .mockResolvedValue({ attendanceId: 1, ...new CreateAttendanceDto() }),
    find: jest.fn().mockResolvedValue([{ attendanceId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ attendanceId: 1 }),
    preload: jest.fn().mockResolvedValue({ attendanceId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: getRepositoryToken(Attendance),
          useValue: mockAttendanceRepository,
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    repository = module.get<Repository<Attendance>>(
      getRepositoryToken(Attendance),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new attendance', async () => {
      const createAttendanceDto: CreateAttendanceDto = {
        attendanceId: 1,
        checkInTime: new Date(),
        checkOutTime: new Date(),
        attendanceDate:  new Date(),
      };
      const attendance = await service.create(createAttendanceDto);
      expect(attendance).toEqual({ attendanceId: 1, ...createAttendanceDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('findAll', () => {
    it('should return an array of attendance', async () => {
      const attendance = await service.findAll();
      expect(attendance).toEqual([{ attendanceId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return an attendance', async () => {
      const attendance = await service.findOne(1);
      expect(attendance).toEqual({ attendanceId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update an attendance', async () => {
      const updateAttendanceDto: CreateAttendanceDto = {
        attendanceId: 1,
        checkInTime: new Date(),
        checkOutTime: new Date(),
        attendanceDate: new Date(),
      };
      const attendance = await service.update(1, updateAttendanceDto);
      expect(attendance).toEqual({ attendanceId: 1, ...updateAttendanceDto });
    });
  });
  describe('remove', () => {
    it('should delete an attendance', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
