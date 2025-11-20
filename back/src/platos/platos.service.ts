// platos.service.ts (ya está correcto)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatoEntity } from './entities/plato.entity';
import { CreatePlatoDto } from './dto/createPlato.dto';
import { UpdatePlatoDto } from './dto/updatePlato.dto';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(PlatoEntity)
    private readonly platoRepository: Repository<PlatoEntity>,
  ) {}

  async findAll(): Promise<PlatoEntity[]> {
    return this.platoRepository.find({ relations: ['region'] });
  }

  async findOne(id: string): Promise<PlatoEntity> {
    const plato = await this.platoRepository.findOne({ 
      where: { id },
      relations: ['region']
    });
    if (!plato) {
      throw new NotFoundException(`Plato con ID ${id} no encontrado`);
    }
    return plato;
  }

  async create(createPlatoDto: CreatePlatoDto): Promise<PlatoEntity> {
    const plato = this.platoRepository.create(createPlatoDto);
    return this.platoRepository.save(plato);
  }

  async update(id: string, updatePlatoDto: UpdatePlatoDto): Promise<PlatoEntity> {
    const plato = await this.findOne(id);
    this.platoRepository.merge(plato, updatePlatoDto);
    return this.platoRepository.save(plato);
  }

  async remove(id: string): Promise<void> {
    const plato = await this.findOne(id);
    await this.platoRepository.remove(plato);
  }
}