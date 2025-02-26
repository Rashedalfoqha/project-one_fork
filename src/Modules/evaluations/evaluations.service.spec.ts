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
    save: jest.fn().mockResolvedValue({ evaluationId: 1, ...new CreateEvaluationDto() }),
    find: jest.fn().mockResolvedValue([{ evaluationId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ evaluationId: 1 }),
    preload: jest.fn().mockResolvedValue({ evaluationId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationsService,{ provide: getRepositoryToken(Evaluation), useValue: mockEvaluationRepository }],
    }).compile();

    service = module.get<EvaluationsService>(EvaluationsService);
    repository=module.get<Repository<Evaluation>>(getRepositoryToken(Evaluation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
