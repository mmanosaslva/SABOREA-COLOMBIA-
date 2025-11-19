import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadEntity } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/createCiudad.dto';
import { UpdateCiudadDto } from './dto/updateCiudad.dto';

@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,
  ) {}

  async findAll(): Promise<CiudadEntity[]> {
    return this.ciudadRepository.find({ relations: ['region'] });
  }

  async findOne(id: string): Promise<CiudadEntity> {
    const ciudad = await this.ciudadRepository.findOne({ 
      where: { id },
      relations: ['region']
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }
    return ciudad;
  }

  async create(createCiudadDto: CreateCiudadDto): Promise<CiudadEntity> {
    const ciudad = this.ciudadRepository.create(createCiudadDto);
    return this.ciudadRepository.save(ciudad);
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto): Promise<CiudadEntity> {
    const ciudad = await this.findOne(id);
    this.ciudadRepository.merge(ciudad, updateCiudadDto);
    return this.ciudadRepository.save(ciudad);
  }

  async remove(id: string): Promise<void> {
    const ciudad = await this.findOne(id);
    await this.ciudadRepository.remove(ciudad);
  }
}