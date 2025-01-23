import {
  IsNumber,
  IsString,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateEvaluationDto {
  @IsNumber({}, { message: 'Quality score must be a valid number' })
  @Min(0, { message: 'Quality score must be at least 0' })
  @Max(10, { message: 'Quality score cannot exceed 10' })
  qualityScore: number; // Quality score (e.g., between 0 and 10)

  @IsNumber({}, { message: 'Commitment score must be a valid number' })
  @Min(0, { message: 'Commitment score must be at least 0' })
  @Max(10, { message: 'Commitment score cannot exceed 10' })
  commitmentScore: number; // Commitment score (e.g., between 0 and 10)

  @IsNumber({}, { message: 'Skills score must be a valid number' })
  @Min(0, { message: 'Skills score must be at least 0' })
  @Max(10, { message: 'Skills score cannot exceed 10' })
  skillsScore: number; // Skills score (e.g., between 0 and 10)

  @IsString({ message: 'Comments must be a string' })
  @IsNotEmpty({ message: 'Comments are required' })
  comments: string; // Comments about the evaluation

  @IsDate({ message: 'Evaluation date must be a valid date' })
  evaluationDate: Date; // The date of the evaluation
}
