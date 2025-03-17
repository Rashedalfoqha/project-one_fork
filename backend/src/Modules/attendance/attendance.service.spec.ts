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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //  crerate test
  it('should create a new attendance', async () => {
    const createAttendanceDto: CreateAttendanceDto = {
      attendanceId: 1,
      employeeId: 1,
      checkInTime: new Date(),
      checkOutTime: new Date(),
      attendanceDate: new Date(),
    };
    const savedAttendance = {
      attendanceId: 1,
      ...createAttendanceDto,
    };

    mockAttendanceRepository.create.mockReturnValue(createAttendanceDto);
    mockAttendanceRepository.save.mockResolvedValue(savedAttendance);

    const result = await service.create(createAttendanceDto);
    expect(result).toEqual(savedAttendance);
  });
  //findAll test
  it('should return all attendance', async () => {
    const attendance = [
      {
        attendanceId: 1,
        employeeId: 1,
        checkInTime: new Date(),
        checkOutTime: new Date(),
        status: 'Present',
      },
    ];
    mockAttendanceRepository.find.mockResolvedValue(attendance);

    const result = await service.findAll();
    expect(result).toEqual(attendance);
  });
  //findOne test
  it('should return one attendance', async () => {
    const attendance = {
      attendanceId: 1,
      employeeId: 1,
      checkInTime: new Date(),
      checkOutTime: new Date(),
      status: 'Present',
    };
    mockAttendanceRepository.findOne.mockResolvedValue(attendance);

    const result = await service.findOne(1);
    expect(result).toEqual(attendance);
  });
  //update test
  it('should update an attendance', async () => {
    const updateAttendanceDto: CreateAttendanceDto = {
      attendanceId: 1,
      employeeId: 1,
      checkInTime: new Date(),
      checkOutTime: new Date(),
      attendanceDate: new Date(),
    };
    const updatedAttendance = {
      attendanceId: 1,
      ...updateAttendanceDto,
    };

    mockAttendanceRepository.preload.mockResolvedValue(updatedAttendance);
    mockAttendanceRepository.save.mockResolvedValue(updatedAttendance);

    const result = await service.update(1, updateAttendanceDto);
    expect(result).toEqual(updatedAttendance);
  });
  //remove test
  it('should remove an attendance', async () => {
    const expectedResponse = {
      message: 'Attendance record 1 deleted successfully',
    };

    mockAttendanceRepository.findOne.mockResolvedValue({
      attendanceId: 1,
      employeeId: 1,
      checkInTime: new Date(),
      checkOutTime: new Date(),
    });

    mockAttendanceRepository.delete.mockResolvedValue({});

    const result = await service.remove(1);

    expect(result).toEqual(expectedResponse);
    expect(mockAttendanceRepository.delete).toHaveBeenCalledWith(1);
  });
});
