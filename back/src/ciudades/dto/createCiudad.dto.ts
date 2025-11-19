import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCiudadDto {
  @ApiProperty({ example: 'Cartagena', description: 'Nombre de la ciudad' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ 
    example: 'Ciudad amurallada con playas hermosas', 
    description: 'Descripción de la ciudad',
    required: false 
  })
  @IsString()
  descripcion?: string;

  @ApiProperty({ 
    example: '687a0b1c-b659-4bb5-a6b3-a94010395ce3', 
    description: 'ID de la región a la que pertenece' 
  })
  @IsNotEmpty()
  @IsUUID()
  regionId: string;
}