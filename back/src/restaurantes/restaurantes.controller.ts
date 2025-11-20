
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { RestaurantesService } from './restaurantes.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('restaurantes')
@ApiBearerAuth()
@Controller('restaurantes')
@UseGuards(JwtAuthGuard)
export class RestaurantesController {
  constructor(private readonly restaurantesService: RestaurantesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los restaurantes' })
  @ApiResponse({ status: 200, description: 'Lista de restaurantes obtenida exitosamente' })
  async findAll() {
    return this.restaurantesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un restaurante por ID' })
  @ApiResponse({ status: 200, description: 'Restaurante encontrado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.restaurantesService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un nuevo restaurante' })
  @ApiResponse({ status: 201, description: 'Restaurante creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Ciudad o platos no encontrados' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  async create(@Body() createRestauranteDto: CreateRestauranteDto) {
    return this.restaurantesService.create(createRestauranteDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async update(@Param('id') id: string, @Body() updateRestauranteDto: UpdateRestauranteDto) {
    return this.restaurantesService.update(id, updateRestauranteDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar un restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  async remove(@Param('id') id: string) {
    return this.restaurantesService.remove(id);
  }
}