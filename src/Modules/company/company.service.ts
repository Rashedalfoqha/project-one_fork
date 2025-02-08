import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company[]> {
    const company = this.companyRepository.find({
      where: { companyId: id },
      relations: ['admins', 'location'],
    });
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    return company;
  }

async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.preload({
      companyId: id,
      ...updateCompanyDto,
    });
    if(!company){
      throw new Error(`Company with ID ${id} not found`);
    }
    return this.companyRepository.save(company);
  }

 async remove(id: number) : Promise <void> {
   const result = await this.companyRepository.delete(id);
   if(result.affected === 0){
     throw new Error(`Company with ID ${id} not found`);
  }
}
}
