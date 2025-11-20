// dto/updatePlato.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatoDto } from './createPlato.dto';

export class UpdatePlatoDto extends PartialType(CreatePlatoDto) {}