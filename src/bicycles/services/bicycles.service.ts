import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';
import { Bicycle } from '../entities/bicycle.entity';

@Injectable()
export class BicyclesService {
  constructor(
    @InjectRepository(Bicycle)
    private readonly bicyclesRep: Repository<Bicycle>,
  ) { }

  async create({ type, gpsLocations, locked }: CreateBicycleDto) {
   
    
    const newBike = new Bicycle();
    newBike.type = type;
    newBike.locked = locked;

    const _gpsLocations: Point = {
      type: 'Point',
      coordinates: [gpsLocations[0], gpsLocations[1]],
    };
    newBike.gpsLocations = _gpsLocations;
    return await this.bicyclesRep.save(newBike);
  }

  async findAll() {
    return await this.bicyclesRep.find({});
  }

  async findOne(id: string) {
    return await this.bicyclesRep.findOne({ id: id });
  }

  async update(id: string, updateBicycleDto: UpdateBicycleDto) {
    return await this.bicyclesRep.update({ id: id }, updateBicycleDto)
  }

  async remove(id: string) {
    return await this.bicyclesRep.delete({ id: id });
  }
}
