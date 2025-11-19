import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadDto } from './createCiudad.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCiudadDto extends PartialType(CreateCiudadDto) {
  @ApiProperty({ example: 'Cartagena de Indias', description: 'Nombre actualizado', required: false })
  nombre?: string;

  @ApiProperty({ example: 'Descripción actualizada', description: 'Descripción actualizada', required: false })
  descripcion?: string;

  @ApiProperty({ example: '687a0b1c-b659-4bb5-a6b3-a94010395ce3', description: 'ID de región actualizado', required: false })
  regionId?: string;
}