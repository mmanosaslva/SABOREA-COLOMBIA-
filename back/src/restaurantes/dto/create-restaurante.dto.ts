import { IsNotEmpty, IsString, IsUUID, MaxLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestauranteDto {
  @ApiProperty({ example: 'El Cielo', description: 'Nombre del restaurante' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiProperty({ 
    example: 'Restaurante de alta cocina colombiana', 
    description: 'Descripción del restaurante' 
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'Calle 123 #45-67', description: 'Dirección del restaurante' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  direccion: string;

  @ApiProperty({ example: '+57 3001234567', description: 'Teléfono del restaurante' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  telefono: string;

  @ApiProperty({ 
    example: 'Lunes a Domingo: 12:00 PM - 10:00 PM', 
    description: 'Horario de atención' 
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  horario: string;

  @ApiProperty({ 
    example: 'https://ejemplo.com/imagen.jpg', 
    description: 'URL de la imagen del restaurante',
    required: false 
  })
  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @ApiProperty({ 
    example: 'd2dcd286-8d87-4c94-9ed0-3c37e2614404', 
    description: 'ID de la ciudad donde está el restaurante' 
  })
  @IsNotEmpty()
  @IsUUID()
  ciudadId: string;

  @ApiProperty({ 
    example: ['eaa74c8c-f515-4205-ae3e-a11dbb984cd0'], 
    description: 'IDs de los platos que ofrece el restaurante',
    required: false 
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  platosIds?: string[];
}