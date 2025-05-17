import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  async crearEvaluacion(proyectoId: number, evaluadorId: number): Promise<EvaluacionEntity> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id: proyectoId },
      relations: ['mentor'],
    });

    if (!proyecto) {
      throw new BadRequestException('Proyecto no encontrado');
    }

    const evaluador = await this.profesorRepository.findOne({
      where: { id: evaluadorId },
    });

    if (!evaluador) {
      throw new BadRequestException('Evaluador no encontrado');
    }

    if (evaluador.id === proyecto.mentor?.id) {
      throw new BadRequestException('El evaluador no puede ser el mentor del proyecto');
    }

    if (proyecto.notaFinal < 0 || proyecto.notaFinal >5 ) {
      throw new BadRequestException(`La calificación debe estar entre 0 y 5`);
    }

    const evaluacion = this.evaluacionRepository.create({
      proyecto:proyecto,
      evaluador:evaluador,
    });

    return await this.evaluacionRepository.save(evaluacion);
  }
}
