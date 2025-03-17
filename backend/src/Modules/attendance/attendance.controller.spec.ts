import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

describe('AttendanceController', () => {
  let controller: AttendanceController;
  let serivce: AttendanceService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceController],
      providers: [AttendanceService],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });





  describe('findAll', () => {
    it('should return an array of cats', async () => {
  
      jest.spyOn(serivce, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});
