import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantesService } from './restaurantes.service';
import { RestaurantesController } from './restaurantes.controller';
import { RestauranteEntity } from './entities/restaurante.entity';
import { CiudadEntity } from '../ciudades/entities/ciudad.entity';
import { PlatoEntity } from '../platos/entities/plato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestauranteEntity, CiudadEntity, PlatoEntity])
  ],
  controllers: [RestaurantesController],
  providers: [RestaurantesService],
  exports: [RestaurantesService],
})
export class RestaurantesModule {}