import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosService } from './platos.service';
import { PlatosController } from './platos.controller';
import { PlatoEntity } from './entities/plato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlatoEntity])],
  controllers: [PlatosController],
  providers: [PlatosService],
  exports: [PlatosService],
})
export class PlatosModule {}