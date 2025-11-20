import { Test, TestingModule } from '@nestjs/testing';
import { RegionesService } from './regiones.service';
import { RegionEntity } from './entities/region.entity';
import { UpdateRegionDto } from './dto/updateRegion.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RegionService', () => {
  let service: RegionesService;
  let regionRepository: Repository<RegionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionesService,
        {
          provide: getRepositoryToken(RegionEntity),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<RegionesService>(RegionesService);
    regionRepository = module.get<Repository<RegionEntity>>(getRepositoryToken(RegionEntity));
  });

  it('deberia actualizar region', async () => {
    
    const id = '1';
    const updateRegionDto: UpdateRegionDto = {
      nombre: 'Región Actualizada',
      
    };
    const existingRegion: RegionEntity = {
      id: '23345',
      nombre: 'Región Actualizada',
        createdAt: new Date(),
        updatedAt: new Date(),
        descripcion: 'Descripción de la región',
        imagenUrl: 'http://example.com/imagen.jpg',

      
    };
    const updatedRegion: RegionEntity = {
      ...existingRegion,
      ...updateRegionDto,
    };

    
    jest.spyOn(service, 'findOne').mockResolvedValue(existingRegion);
    
    jest.spyOn(regionRepository, 'merge').mockReturnValue(updatedRegion);
    
    jest.spyOn(regionRepository, 'save').mockResolvedValue(updatedRegion);

    
    const result = await service.update(id, updateRegionDto);

    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(regionRepository.merge).toHaveBeenCalledWith(existingRegion, updateRegionDto);
    expect(regionRepository.save).toHaveBeenCalledWith(updatedRegion);
    expect(result).toEqual(updatedRegion);
  });
});
