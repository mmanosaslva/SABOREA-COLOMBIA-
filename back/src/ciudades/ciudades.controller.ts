import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto } from './dto/createCiudad.dto';
import { UpdateCiudadDto } from './dto/updateCiudad.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('ciudades')
@ApiBearerAuth('JWT-auth') 
@Controller('ciudades')
@UseGuards(JwtAuthGuard)
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ciudades' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades obtenida exitosamente' })
  async findAll() {
    return this.ciudadesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ciudad por ID' })
  @ApiResponse({ status: 200, description: 'Ciudad encontrada' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.ciudadesService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva ciudad' })
  @ApiResponse({ status: 201, description: 'Ciudad creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadesService.create(createCiudadDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar una ciudad' })
  @ApiResponse({ status: 200, description: 'Ciudad actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  async update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadesService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una ciudad' })
  @ApiResponse({ status: 200, description: 'Ciudad eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  async remove(@Param('id') id: string) {
    return this.ciudadesService.remove(id);
  }
}