import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionesService } from './regiones.service';
import { CreateRegionDto } from './dto/createRegion.dto';
import { UpdateRegionDto } from './dto/updateRegion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('regiones')
@ApiBearerAuth()
@Controller('regiones')
@UseGuards(JwtAuthGuard)
export class RegionesController {
  constructor(private readonly regionesService: RegionesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las regiones' })
  @ApiResponse({ status: 200, description: 'Lista de regiones obtenida exitosamente' })
  async findAll() {
    return this.regionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una región por ID' })
  @ApiResponse({ status: 200, description: 'Región encontrada' })
  @ApiResponse({ status: 404, description: 'Región no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.regionesService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva región' })
  @ApiResponse({ status: 201, description: 'Región creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionesService.create(createRegionDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar una región' })
  @ApiResponse({ status: 200, description: 'Región actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Región no encontrada' })
  async update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionesService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una región' })
  @ApiResponse({ status: 200, description: 'Región eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Región no encontrada' })
  async remove(@Param('id') id: string) {
    return this.regionesService.remove(id);
  }
}