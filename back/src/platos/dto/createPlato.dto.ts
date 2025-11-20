// dto/createPlato.dto.ts
import { IsNotEmpty, IsString, IsUUID, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlatoDto {
  @ApiProperty({ example: 'Ceviche', description: 'Nombre del plato' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ 
    example: 'Plato de mariscos crudos marinados en limón', 
    description: 'Descripción del plato' 
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ 
    example: 'Plato tradicional de la costa Pacífica', 
    description: 'Historia y origen del plato',
    required: false 
  })
  @IsString()
  @IsOptional()
  historia?: string;

  @ApiProperty({ 
    example: 'Pescado, limón, cebolla, cilantro, ají', 
    description: 'Ingredientes del plato',
    required: false 
  })
  @IsString()
  @IsOptional()
  ingredientes?: string; // CAMBIO: string en lugar de string[]

  @ApiProperty({ 
    example: '0c3d351b-96ba-4c74-b951-186ff695ad9d', 
    description: 'ID de la región de origen' 
  })
  @IsNotEmpty()
  @IsUUID()
  regionId: string;
}