import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalariesService {
  constructor(
    @InjectRepository(Salary)
    private readonly salaryRepositroy: Repository<Salary>,
  ) {}
  async create(createSalaryDto: CreateSalaryDto): Promise<Salary> {
    const salaries = this.salaryRepositroy.create(createSalaryDto);
    return this.salaryRepositroy.save(salaries);
  }

  async findAll(): Promise<Salary[]> {
    const salaries = await this.salaryRepositroy.find({
      relations: ['employees'],
    });
    return salaries;
  }

  async findOne(id: number): Promise<Salary> {
    const salaries = await this.salaryRepositroy.findOne({
      where: { salaryId: id },
      relations: ['employees'],
    });
    return salaries;
  }

  async update(id: number, updateSalaryDto: UpdateSalaryDto): Promise<Salary> {
    const salary = await this.salaryRepositroy.preload({
      salaryId: id,
      ...updateSalaryDto,
    });
    return this.salaryRepositroy.save(salary);
  }

  async remove(id: number): Promise<void> {
    const result = await this.salaryRepositroy.delete(id);
    if (result.affected === 0) {
      throw new Error(`Salary with ID ${id} not found`);
    }
  }
}
