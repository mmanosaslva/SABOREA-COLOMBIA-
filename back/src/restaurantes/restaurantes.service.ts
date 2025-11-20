import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteEntity } from './entities/restaurante.entity';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { CiudadEntity } from '../ciudades/entities/ciudad.entity';
import { PlatoEntity } from '../platos/entities/plato.entity';

@Injectable()
export class RestaurantesService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepository: Repository<RestauranteEntity>,
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,
    @InjectRepository(PlatoEntity)
    private readonly platoRepository: Repository<PlatoEntity>,
  ) {}

  async findAll(): Promise<RestauranteEntity[]> {
    return this.restauranteRepository.find({ 
      relations: ['ciudad', 'platos'],
      order: { nombre: 'ASC' }
    });
  }

  async findOne(id: string): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepository.findOne({ 
      where: { id },
      relations: ['ciudad', 'platos']
    });
    if (!restaurante) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }
    return restaurante;
  }

  async create(createRestauranteDto: CreateRestauranteDto): Promise<RestauranteEntity> {
    // Verificar que la ciudad existe
    const ciudad = await this.ciudadRepository.findOne({ 
      where: { id: createRestauranteDto.ciudadId } 
    });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${createRestauranteDto.ciudadId} no encontrada`);
    }

    // Buscar platos si se proporcionan IDs
    let platos: PlatoEntity[] = [];
    if (createRestauranteDto.platosIds && createRestauranteDto.platosIds.length > 0) {
      platos = await this.platoRepository.findByIds(createRestauranteDto.platosIds);
      
      // Verificar que todos los platos existen
      if (platos.length !== createRestauranteDto.platosIds.length) {
        throw new NotFoundException('Algunos platos no fueron encontrados');
      }
    }

    // Crear el restaurante
    const restaurante = this.restauranteRepository.create({
      ...createRestauranteDto,
      ciudad,
      platos
    });

    return this.restauranteRepository.save(restaurante);
  }

  async update(id: string, updateRestauranteDto: UpdateRestauranteDto): Promise<RestauranteEntity> {
    const restaurante = await this.findOne(id);
    
    // Actualizar ciudad si se proporciona
    if (updateRestauranteDto.ciudadId) {
      const ciudad = await this.ciudadRepository.findOne({ 
        where: { id: updateRestauranteDto.ciudadId } 
      });
      if (!ciudad) {
        throw new NotFoundException(`Ciudad con ID ${updateRestauranteDto.ciudadId} no encontrada`);
      }
      restaurante.ciudad = ciudad;
    }

    // Actualizar platos si se proporcionan
    if (updateRestauranteDto.platosIds) {
      const platos = await this.platoRepository.findByIds(updateRestauranteDto.platosIds);
      if (platos.length !== updateRestauranteDto.platosIds.length) {
        throw new NotFoundException('Algunos platos no fueron encontrados');
      }
      restaurante.platos = platos;
    }

    // Actualizar otros campos
    this.restauranteRepository.merge(restaurante, updateRestauranteDto);
    
    return this.restauranteRepository.save(restaurante);
  }

  async remove(id: string): Promise<void> {
    const restaurante = await this.findOne(id);
    await this.restauranteRepository.remove(restaurante);
  }
}