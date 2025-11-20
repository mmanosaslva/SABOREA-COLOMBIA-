import { Test, TestingModule } from '@nestjs/testing';
import { PlatosService } from './platos.service';
import { PlatoEntity } from './entities/plato.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlatoService', () => {
  let service: PlatosService;
  let platoRepository: Repository<PlatoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatosService,
        {
          provide: getRepositoryToken(PlatoEntity),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<PlatosService>(PlatosService);
    platoRepository = module.get<Repository<PlatoEntity>>(getRepositoryToken(PlatoEntity));
  });

  it('deberia remover plato', async () => {
    const id = '1';
    const mockPlato: PlatoEntity = {
      id: '23345',
      nombre: 'Plato a Eliminar',
        descripcion: 'Descripción del plato a eliminar',
        regionId: 'region-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        region: {} as PlatoEntity,
        historia: 'Historia de la región',
        ingredientes: 'Ingredientes de la región',
        imagenUrl: 'http://example.com/imagen.jpg',
        restaurantes: [],
      
    };

    
    jest.spyOn(service, 'findOne').mockResolvedValue(mockPlato);
    
    jest.spyOn(platoRepository, 'remove').mockResolvedValue(mockPlato); 

    
    await service.remove(id);

    
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(platoRepository.remove).toHaveBeenCalledWith(mockPlato);
  });
});
