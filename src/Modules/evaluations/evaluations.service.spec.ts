import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EvaluationsService', () => {
  let service: EvaluationsService;
  let repository: Repository<Evaluation>;
  const mockEvaluationRepository = {
    create: jest.fn().mockImplementation((dto: CreateEvaluationDto) => dto),
    save: jest
      .fn()
      .mockResolvedValue({ evaluationId: 1, ...new CreateEvaluationDto() }),
    find: jest.fn().mockResolvedValue([{ evaluationId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ evaluationId: 1 }),
    preload: jest.fn().mockResolvedValue({ evaluationId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationsService,
        {
          provide: getRepositoryToken(Evaluation),
          useValue: mockEvaluationRepository,
        },
      ],
    }).compile();

    service = module.get<EvaluationsService>(EvaluationsService);
    repository = module.get<Repository<Evaluation>>(
      getRepositoryToken(Evaluation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new evaluation', async () => {
      const createEvaluationDto: CreateEvaluationDto = {
        evaluationId: 1,
        qualityScore: 1,
        commitmentScore: 2,
        skillsScore: 3,
        comments: 'A',
        evaluationDate: new Date(),
        employeeId: 1,
      };
      const evaluation = await service.create(createEvaluationDto);
      expect(evaluation).toEqual({ evaluationId: 1, ...createEvaluationDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('findAll', () => {
    it('should return an array of evaluations', async () => {
      const evaluations = await service.findAll();
      expect(evaluations).toEqual([{ evaluationId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return an evaluation', async () => {
      const evaluation = await service.findOne(1);
      expect(evaluation).toEqual({ evaluationId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update an evaluation', async () => {
      const updateEvaluationDto: CreateEvaluationDto = {
        evaluationId: 6,
        qualityScore: 4,
        commitmentScore: 2,
        skillsScore: 41,
        comments: 'A',
        evaluationDate: new Date(),
        employeeId: 2,
      };
      const evaluation = await service.update(1, updateEvaluationDto);
      expect(evaluation).toEqual({ evaluationId: 1, ...updateEvaluationDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });
  describe('remove', () => {
    it('should delete an evaluation', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
