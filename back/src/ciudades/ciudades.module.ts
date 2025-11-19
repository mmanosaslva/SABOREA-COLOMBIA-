import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { CiudadEntity } from './entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity])],
  controllers: [CiudadesController],
  providers: [CiudadesService],
  exports: [CiudadesService],
})
export class CiudadesModule {}