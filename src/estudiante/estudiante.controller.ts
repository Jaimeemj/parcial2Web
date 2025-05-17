import { Controller, Post, Delete, Param, Body, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDTO } from './estudiante.dto';
import { Long } from 'typeorm';

@Controller('')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('crearEstudiantes')
  async crearEstudiante(@Body() estudianteDto: EstudianteDTO) {
    try {
      return await this.estudianteService.crearEstudiante(estudianteDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('eliminarEstudiantes/:id')
  async eliminarEstudiante(@Param('id', ParseIntPipe) id: Long) {
    try {
      await this.estudianteService.eliminarEstudiante(id);
      return { mensaje: 'Estudiante eliminado correctamente' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
