import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './createRegion.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @ApiProperty({ example: 'Caribe Norte', description: 'Nombre actualizado de la región', required: false })
  nombre?: string;

  @ApiProperty({ example: 'Región costera actualizada', description: 'Descripción actualizada', required: false })
  descripcion?: string;
}
