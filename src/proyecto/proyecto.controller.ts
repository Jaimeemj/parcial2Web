import {
  Controller,Post,Body,Get,Param,ParseIntPipe,Patch,BadRequestException
} from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoDTO } from './proyecto.dto';
import { Long } from 'typeorm';

@Controller('')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post('crearProyecto')
  async crearProyecto(@Body() proyectoDto: ProyectoDTO) {
    try {
      return await this.proyectoService.crearProyecto(proyectoDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error creando proyecto');
    }
  }
/*
  @Get(':id')
  async getProyecto(@Param('id', ParseIntPipe) id: number) {
    const proyecto = await this.proyectoService.findProyecto(id);
    if (!proyecto) {
      throw new BadRequestException('Proyecto no encontrado');
    }
    return proyecto;
  }*/

  @Patch('avanzarProyecto/:id')
  async avanzarProyecto(@Param('id', ParseIntPipe) id: Long) {
    try {
      return await this.proyectoService.avanzarProyecto(id);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al avanzar el estado del proyecto');
    }
  }

  @Get('findAllEstudiantes')
  async obtenerLideres() {
    return await this.proyectoService.findAllEstudiantes();
  }
}
