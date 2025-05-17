import { Controller, Post, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';

@Controller('')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post('crearEvaluacion/:idProyecto/:idEvaluador')
  async crearEvaluacion(
    @Param('idProyecto', ParseIntPipe) proyectoId: number,
    @Param('idEvaluador', ParseIntPipe) evaluadorId: number,
  ): Promise<EvaluacionEntity> {
    return await this.evaluacionService.crearEvaluacion(proyectoId, evaluadorId);
  }
}
