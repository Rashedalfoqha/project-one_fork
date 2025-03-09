import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}
  async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    const evaluation =
      await this.evaluationRepository.create(createEvaluationDto);
    return await this.evaluationRepository.save(evaluation);
  }

  async findAll(): Promise<Evaluation[]> {
    return this.evaluationRepository.find();
  }

  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOne({
      where: { evaluationId: id },
      relations: ['employee'],
    });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    return evaluation;
  }

  async update(
    id: number,
    updateEvaluationDto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.preload({
      evaluationId: id,
      ...updateEvaluationDto,
    });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    return this.evaluationRepository.save(evaluation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.evaluationRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Evaluation with ID ${id} not found`);
    }
  }
}
