import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './entities/leave.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
  ) { }
  async create(createLeaveDto: CreateLeaveDto): Promise<Leave> {
    const leave = await this.leaveRepository.create(createLeaveDto);
    return this.leaveRepository.save(leave);
  }

  async findAll(): Promise<Leave[]> {
    const leaves = await this.leaveRepository.find({ relations: ['employee'] });
    return leaves;
  }

  async findOne(id: number): Promise<Leave> {
    const leave = await this.leaveRepository.findOne({
      where: { leaveId: id },
      relations: ['employee'],
    });

    if (!leave) {
      throw new Error('Leave not found'); // throws an error
    }

    return leave;
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    const leave = await this.leaveRepository.preload({
      leaveId: id,
      ...updateLeaveDto,
    });
    if (!leave) {
      throw new Error('Leave not found');
    }
    return this.leaveRepository.save(leave);
  }

  async remove(id: number) {
    const results = await this.leaveRepository.delete(id);
    if (results.affected === 0) {
      throw new Error('Leave not found');
    }
  }
}
