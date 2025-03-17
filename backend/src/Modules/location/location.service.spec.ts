import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

describe('LocationService', () => {
  let service: LocationService;
  let repository: Repository<Location>;

  const mockLocationRepository = {
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
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockLocationRepository,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    repository = module.get<Repository<Location>>(getRepositoryToken(Location));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Create test
  it('should create a new location', async () => {
    const createLocationDto: CreateLocationDto = {
      locationId: 1,
      latitude: '123',
      longitude: '123',
      radius: '123',
      companyId: 1,
    };
    const savedLocation = {
      locationId: 1,
      ...createLocationDto,
    };

    mockLocationRepository.create.mockReturnValue(createLocationDto);
    mockLocationRepository.save.mockResolvedValue(savedLocation);

    const result = await service.create(createLocationDto);
    expect(result).toEqual(savedLocation);
    expect(repository.create).toHaveBeenCalledWith(createLocationDto);
    expect(repository.save).toHaveBeenCalledWith(createLocationDto);
  });

  // FindOne test
  it('should find a location by id', async () => {
    const foundLocation = {
      locationId: 1,
      latitude: '123',
      longitude: '123',
      radius: '123',
      companyId: 1,
    };

    mockLocationRepository.findOne.mockResolvedValueOnce(foundLocation);

    const result = await service.findOne(1);
    expect(result).toEqual(foundLocation);
    
    // Adjusted to match the actual function call, including relations
    expect(repository.findOne).toHaveBeenCalledWith({ where: { locationId: 1 }, relations: ['employees'] });
  });

  it('should throw NotFoundException if location is not found', async () => {
    mockLocationRepository.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  // Update test
  it('should update a location', async () => {
    const updateLocationDto: UpdateLocationDto = {
      latitude: '124',
      longitude: '124',
      radius: '124',
    };

    const existingLocation = {
      locationId: 1,
      latitude: '123',
      longitude: '123',
      radius: '123',
    };

    const updatedLocation = {
      ...existingLocation,
      ...updateLocationDto,
    };

    mockLocationRepository.preload.mockResolvedValue(updatedLocation);
    mockLocationRepository.save.mockResolvedValue(updatedLocation);

    const result = await service.update(1, updateLocationDto);
    expect(result).toEqual(updatedLocation);
    expect(repository.preload).toHaveBeenCalledWith({
      locationId: 1,
      ...updateLocationDto,
    });
    expect(repository.save).toHaveBeenCalledWith(updatedLocation);
  });

  it('should throw NotFoundException if updating a non-existent location', async () => {
    mockLocationRepository.preload.mockResolvedValueOnce(undefined);

    await expect(service.update(1, { latitude: '124' })).rejects.toThrow(NotFoundException);
  });

  // Delete test
  it('should delete a location', async () => {
    mockLocationRepository.delete.mockResolvedValueOnce({ affected: 1 });

    const result = await service.remove(1);
    expect(result).toBeUndefined();
    
    // Ensure we're checking with the correct argument
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if location is not found for deletion', async () => {
    mockLocationRepository.delete.mockResolvedValueOnce({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});
