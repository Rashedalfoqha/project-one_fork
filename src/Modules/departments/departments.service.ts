import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { departmentId: id },
      relations: ['employees'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }
  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.departmentRepository.preload({
      departmentId: id,
      ...updateDepartmentDto,
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    const department = await this.departmentRepository.delete(id);
    if (department.affected === 0) {
      throw new Error(`Department with ID ${id} not found`);
    }
  }
}
