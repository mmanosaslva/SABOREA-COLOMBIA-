import { Test, TestingModule } from '@nestjs/testing';
import { CiudadesService } from './ciudades.service';
import { CiudadEntity } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/createCiudad.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegionEntity } from 'src/regiones/entities/region.entity';

describe('CiudadService', () => {
  let service: CiudadesService;
  let ciudadRepository: Repository<CiudadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadesService,
        {
          provide: getRepositoryToken(CiudadEntity),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<CiudadesService>(CiudadesService);
    ciudadRepository = module.get<Repository<CiudadEntity>>(getRepositoryToken(CiudadEntity));
  });

  it('deberia crear y guardar a ciudad', async () => {
    
    const createCiudadDto: CreateCiudadDto = {
      nombre: 'Madrid',
      regionId: '234577',
      
    };
    const mockCiudad: CiudadEntity = {
      id: '23446',
      nombre: 'Madrid',
      descripcion: 'Descripción de Madrid',
      regionId: 'region-uuid',
      region: { id: '45885', 
        nombre: 'Comunidad de Madrid', 
        descripcion: '', 
        createdAt: new Date(), 
        updatedAt: new Date() } as RegionEntity,
      createdAt: new Date(),
      updatedAt: new Date(),
      
    };

    
    jest.spyOn(ciudadRepository, 'create').mockReturnValue(mockCiudad);
    
    jest.spyOn(ciudadRepository, 'save').mockResolvedValue(mockCiudad);

    const result = await service.create(createCiudadDto);

    expect(ciudadRepository.create).toHaveBeenCalledWith(createCiudadDto);
    expect(ciudadRepository.save).toHaveBeenCalledWith(mockCiudad);
    expect(result).toEqual(mockCiudad);
  });
});