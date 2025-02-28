import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: Repository<Company>;

  const mockCompanyRepository = {
    create: jest.fn().mockImplementation((dto: CreateCompanyDto) => dto),
    save: jest.fn().mockResolvedValue({ companyId: 1, ...new CreateCompanyDto() }),
    find: jest.fn().mockResolvedValue([{ companyId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ companyId: 1 }),
    preload: jest.fn().mockResolvedValue({ companyId: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: mockCompanyRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Google',
        address: 'Mountain View',
        email: 'rashed@gmail.com',
        phone: '0599999999',
        website: 'www.google.com',
      };

      const company = await service.create(createCompanyDto);
      expect(company).toEqual({ companyId: 1, ...createCompanyDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const companies = await service.findAll();
      expect(companies).toEqual([{ companyId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a company', async () => {
      const company = await service.findOne(1);
      expect(company).toEqual({ companyId: 1 });
      expect(repository.findOne).toHaveBeenCalled();
    });

    it('should throw an error if company is not found', async () => {
      mockCompanyRepository.findOne.mockResolvedValueOnce(undefined);
      await expect(service.findOne(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const updateCompanyDto: Partial<CreateCompanyDto> = {
        name: 'Alphabet',
        website: 'www.alphabet.com',
      };

      const company = await service.update(1, updateCompanyDto);
      expect(company).toEqual({ companyId: 1, ...updateCompanyDto });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw an error if company is not found', async () => {
      mockCompanyRepository.preload.mockResolvedValueOnce(undefined);
      await expect(service.update(1, {})).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a company', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalled();
    });

    it('should throw an error if company is not found', async () => {
      mockCompanyRepository.delete.mockResolvedValueOnce({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow();
    });
  });
});
