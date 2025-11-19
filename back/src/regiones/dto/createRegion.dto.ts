import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({ example: 'Caribe', description: 'Nombre de la región' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ 
    example: 'Región costera con influencia africana y caribeña', 
    description: 'Descripción de la región',
    required: false 
  })
  @IsString()
  descripcion?: string;
}