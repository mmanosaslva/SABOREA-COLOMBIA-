import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionesService } from './regiones.service';
import { RegionesController } from './regiones.controller';
import { RegionEntity } from './entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  controllers: [RegionesController],
  providers: [RegionesService],
  exports: [RegionesService],
})
export class RegionesModule {}