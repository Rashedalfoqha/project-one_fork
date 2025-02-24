import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = await this.locationRepository.create(createLocationDto);
    return  this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find({ relations: ['employees'] });
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { locationId: id },
      relations: ['employees'],
    });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return await this.locationRepository.save(location);
  }

  async remove(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  }
}
