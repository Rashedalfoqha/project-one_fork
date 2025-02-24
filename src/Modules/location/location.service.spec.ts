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
    create: jest.fn().mockImplementation((dto: CreateLocationDto) => dto),
    save: jest
      .fn()
      .mockResolvedValue({ locationId: 1, ...new CreateLocationDto() }),
    find: jest.fn().mockResolvedValue([{ locationId: 1 }]),
    findOne: jest.fn().mockResolvedValue({ locationId: 1 }),
    preload: jest
      .fn()
      .mockResolvedValue({ locationId: 1, latitude: '10', longitude: '10' }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
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

  describe('create', () => {
    it('should create a new location', async () => {
      const createLocationDto: CreateLocationDto = {
        companyId: 1,
        radius: '100',
        latitude: '10',
        longitude: '10',
      };
      const location = await service.create(createLocationDto);
      expect(location).toEqual({ locationId: 1, ...createLocationDto });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all locations', async () => {
      const locations = await service.findAll();
      expect(locations).toEqual([{ locationId: 1 }]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a location by id', async () => {
      const location = await service.findOne(1);
      expect(location).toEqual({ locationId: 1 });
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { locationId: 1 },
        relations: ['employees'],
      });
    });

    it('should throw a NotFoundException if location not found', async () => {
      mockLocationRepository.findOne.mockResolvedValue(null); // Simulate not found
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const updateLocationDto: UpdateLocationDto = {
        latitude: '11',
        longitude: '11',
      };
      const updatedLocation = await service.update(1, updateLocationDto);
      expect(updatedLocation).toEqual({
        locationId: 1,
        name: 'Updated Location',
      });
      expect(repository.preload).toHaveBeenCalledWith({
        locationId: 1,
        ...updateLocationDto,
      });
    });

    it('should throw a NotFoundException if location to update is not found', async () => {
      mockLocationRepository.preload.mockResolvedValue(null); // Simulate not found
      const updateLocationDto: UpdateLocationDto = {
        latitude: '10',
        longitude: '10',
      };
      await expect(service.update(999, updateLocationDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a location', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if location to delete is not found', async () => {
      mockLocationRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
