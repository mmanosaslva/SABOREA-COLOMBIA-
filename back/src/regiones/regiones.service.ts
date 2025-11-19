import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from './entities/region.entity';
import { CreateRegionDto } from './dto/createRegion.dto';
import { UpdateRegionDto } from './dto/updateRegion.dto';

@Injectable()
export class RegionesService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async findAll(): Promise<RegionEntity[]> {
    return this.regionRepository.find();
  }

  async findOne(id: string): Promise<RegionEntity> {
    const region = await this.regionRepository.findOne({ where: { id } });
    if (!region) {
      throw new NotFoundException(`Región con ID ${id} no encontrada`);
    }
    return region;
  }

  async create(createRegionDto: CreateRegionDto): Promise<RegionEntity> {
    const region = this.regionRepository.create(createRegionDto);
    return this.regionRepository.save(region);
  }

  async update(id: string, updateRegionDto: UpdateRegionDto): Promise<RegionEntity> {
    const region = await this.findOne(id);
    this.regionRepository.merge(region, updateRegionDto);
    return this.regionRepository.save(region);
  }

  async remove(id: string): Promise<void> {
    const region = await this.findOne(id);
    await this.regionRepository.remove(region);
  }
}