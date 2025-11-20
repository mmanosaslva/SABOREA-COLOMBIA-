import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/createPlato.dto';
import { UpdatePlatoDto } from './dto/updatePlato.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('platos')
@ApiBearerAuth()
@Controller('platos')
@UseGuards(JwtAuthGuard)
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los platos' })
  @ApiResponse({ status: 200, description: 'Lista de platos obtenida exitosamente' })
  async findAll() {
    return this.platosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plato por ID' })
  @ApiResponse({ status: 200, description: 'Plato encontrado' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.platosService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo plato' })
  @ApiResponse({ status: 201, description: 'Plato creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createPlatoDto: CreatePlatoDto) {
    return this.platosService.create(createPlatoDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un plato' })
  @ApiResponse({ status: 200, description: 'Plato actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plato no encontrada' })
  async update(@Param('id') id: string, @Body() updatePlatoDto: UpdatePlatoDto) {
    return this.platosService.update(id, updatePlatoDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un plato' })
  @ApiResponse({ status: 200, description: 'Plato eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado' })
  async remove(@Param('id') id: string) {
    return this.platosService.remove(id);
  }
}