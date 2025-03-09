import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import exp from 'constants';
import { NotFoundException } from '@nestjs/common';

describe('EvaluationsService', () => {
  let service: EvaluationsService;
  let repository: Repository<Evaluation>;

  const mockEvaluationRepository = {
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new evaluation', async () => {
    const createEvaluationDto: CreateEvaluationDto = {
      evaluationId: 1,
      qualityScore: 5,
      commitmentScore: 5,
      skillsScore: 4,
      comments: 'Good',
      evaluationDate: new Date(),
      employeeId: 5,
    };
    const savedEvaluation = {
      evaluationId: 1,
      ...createEvaluationDto,
    };

    mockEvaluationRepository.create.mockReturnValue(createEvaluationDto);
    mockEvaluationRepository.save.mockResolvedValue(savedEvaluation);

    const result = await service.create(createEvaluationDto);
    expect(result).toEqual(savedEvaluation);
  });
  it('should throw an Error if leave is not found', async () => {
    mockEvaluationRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException); // ✅ Now this will pass
  });

  // update test
  it('should update a evaluation', async () => {
    const updateEvaluationDto: CreateEvaluationDto = {
      evaluationId: 1,
      qualityScore: 4,
      commitmentScore: 2,
      skillsScore: 7,
      comments: 'Good',
      evaluationDate: new Date(),
      employeeId: 5,
    };
    const existingEvaluation = { evaluationId: 1, ...updateEvaluationDto };
    mockEvaluationRepository.preload.mockResolvedValue(existingEvaluation);
    mockEvaluationRepository.save.mockResolvedValue(existingEvaluation);
    const result = await service.update(1, updateEvaluationDto);
    expect(result).toEqual(existingEvaluation);
    expect(repository.preload).toHaveBeenCalledWith({
      evaluationId: 1,
      ...updateEvaluationDto,
    });
    expect(repository.save).toHaveBeenCalledWith(existingEvaluation);
  });
  // update test (failure case)
  it('should throw an Error if evaluation is not found', async () => {
    mockEvaluationRepository.preload.mockResolvedValueOnce(undefined);
    await expect(service.update(1, {} as CreateEvaluationDto)).rejects.toThrow(
      NotFoundException,
    );
  });
  //  Remove test
  it('should remove a evaluation', async () => {
    mockEvaluationRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove(1)).rejects.toThrow(Error);
  });
});
