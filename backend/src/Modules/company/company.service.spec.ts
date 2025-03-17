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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Create test
  it('should create a new company', async () => {
    const createCompanyDto: CreateCompanyDto = {
      name: 'Company',

      address: '123 Main St',
      phone: '123-456-7890',
      email: 'random@gmail.com',
      website: 'www.random.com',
    };
    const savedCompany = {
      companyId: 1,
      ...createCompanyDto,
    };

    mockCompanyRepository.create.mockReturnValue(createCompanyDto);
    mockCompanyRepository.save.mockResolvedValue(savedCompany);

    const result = await service.create(createCompanyDto);
    expect(result).toEqual(savedCompany);
    expect(mockCompanyRepository.create).toHaveBeenCalledWith(createCompanyDto);
    expect(mockCompanyRepository.save).toHaveBeenCalledWith(createCompanyDto);
  });
  it('should throw an Error if leave is not found', async () => {
    mockCompanyRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findOne(1)).rejects.toThrow(Error); // ✅ Now this will pass
  });
  // update test
  it('should update a company', async () => {
    const createCompanyDto: CreateCompanyDto = {
      name: 'Company',

      address: '123 Main St',
      phone: '123-456-7890',
      email: 'raandom@gmail.com',
    };
    const updatedCompany = {
      companyId: 1,
      ...createCompanyDto,
    };
    mockCompanyRepository.preload.mockResolvedValue(updatedCompany);
    mockCompanyRepository.save.mockResolvedValue(updatedCompany);
    const result = await service.update(1, createCompanyDto);
    expect(result).toEqual(updatedCompany);
    expect(repository.preload).toHaveBeenCalledWith({
      companyId: 1,
      ...createCompanyDto,
    });
    expect(repository.save).toHaveBeenCalledWith(updatedCompany);
  });
  // update test (failure case)
  it('should throw an Error if company is not found', async () => {
    mockCompanyRepository.preload.mockResolvedValueOnce(undefined);
    await expect(service.update(1, {} as CreateCompanyDto)).rejects.toThrow(
      Error,
    );
  });
  // delete test
  it('should delete a company', async () => {
    mockCompanyRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove(1)).rejects.toThrow(Error);
  });
});
