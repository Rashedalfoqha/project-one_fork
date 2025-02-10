import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepositroy: Repository<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location[]> {
    const location = await this.locationRepositroy.create(createLocationDto);
    return await this.locationRepositroy.save(location);
  }

  async findAll(): Promise<Location[]> {
    const location = await this.locationRepositroy.find({
      relations: ['employees'],
    });
    return location;
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepositroy.findOne({
      where: { locationId: id },
      relations: ['employees'],
    });
    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.locationRepositroy.preload({
      locationId: id,
      ...updateLocationDto,
    });
    return location;
  }

  async remove(id: number): Promise<void> {
    const result = await this.locationRepositroy.delete(id);
    if (result.affected === 0) {
      throw new Error(`Location with ID ${id} not found`);
    }
  }
}
