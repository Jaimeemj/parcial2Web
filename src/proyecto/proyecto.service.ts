import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Long, Repository } from 'typeorm';
import { ProyectoDTO } from './proyecto.dto';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,

    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,

    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,

    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>
  ) {}

  async findProyecto(id: number): Promise<ProyectoEntity | null> {
    return await this.proyectoRepository.findOne({
      where: { id },
      relations: ['lider', 'evaluaciones', 'mentor'],
    });
  }

  async crearProyecto(proyectoInfo: ProyectoDTO): Promise<ProyectoEntity> {
    if (proyectoInfo.presupuesto > 0 && proyectoInfo.titulo.length > 15) {

      let lider: EstudianteEntity | null = null;
      if (proyectoInfo.liderId) {
        lider = await this.estudianteRepository.findOne({ where: { id: proyectoInfo.liderId } });
        if (!lider) {
          throw new Error(`No se encontró el estudiante con ID ${proyectoInfo.liderId}`);
        }
      }


      let mentor: ProfesorEntity | null = null;
      if (proyectoInfo.mentorId) {
        mentor = await this.profesorRepository.findOne({ where: { id: proyectoInfo.mentorId } });
        if (!mentor) {
          throw new Error(`No se encontró el profesor con ID ${proyectoInfo.mentorId}`);
        }
      }

     
      const evaluaciones: EvaluacionEntity[] = [];
      if (proyectoInfo.evaluacionesIds && proyectoInfo.evaluacionesIds.length > 0) {
        for (const id of proyectoInfo.evaluacionesIds) {
          const evaluacion = await this.evaluacionRepository.findOne({ where: { id } });
          if (!evaluacion) {
            throw new Error(`Evaluación con ID ${id} no existe`);
          }
          evaluaciones.push(evaluacion);
        }
      }
      if (proyectoInfo.estado>4 ||proyectoInfo.estado<0 ) {
        throw new Error('El estado debe estar entre 0 y 4');
      }
      const proyecto = this.proyectoRepository.create({
        titulo: proyectoInfo.titulo,
        area: proyectoInfo.area,
        presupuesto: proyectoInfo.presupuesto,
        notaFinal: proyectoInfo.notaFinal,
        estado: proyectoInfo.estado,
        fechaInicio: proyectoInfo.fechaInicio,
        fechaFin: proyectoInfo.fechaFin,
        lider: lider ?? undefined,
        mentor: mentor ?? undefined,
        evaluaciones: evaluaciones
      });

      const saved = await this.proyectoRepository.save(proyecto);
      if (lider) {
        lider.proyectos = [...(lider.proyectos || []), saved];
        await this.estudianteRepository.save(lider);
      }

      if (mentor) {
        mentor.mentorias = [...(mentor.mentorias || []), saved];
        await this.profesorRepository.save(mentor);
      }
      const result = await this.proyectoRepository.findOne({
        where: { id: saved.id },
        relations: ['lider', 'evaluaciones', 'mentor','lider.proyectos','evaluaciones.proyecto','mentor.mentorias']
      });

      if (!result) {
        throw new Error('No se pudo encontrar el proyecto guardado');
      }

      return result;
    }

    throw new Error('El presupuesto debe ser mayor a 0 y el título debe tener más de 15 caracteres');
  }

  async avanzarProyecto(id: number) {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: Number(id) } });
    if (!proyecto) {
      throw new Error('No existe el proyecto');
    }

    if (proyecto.estado < 4) {
      proyecto.estado += 1;
      await this.proyectoRepository.save(proyecto);

      return await this.proyectoRepository.findOne({
        where: { id: Number(id) },
        relations: ['lider', 'evaluaciones', 'mentor']
      });


    } else {
      throw new Error('El proyecto ya tiene su estado en el máximo valor posible');
    }
  }

  async findAllEstudiantes(): Promise<EstudianteEntity[]> {
    const proyectos = await this.proyectoRepository.find({
      relations: ['lider'],
    });

    const estudiantes: EstudianteEntity[] = [];
    for (const proyecto of proyectos) {
      const lider = proyecto.lider;
      if (lider && !estudiantes.find(e => e.id === lider.id)) {
        estudiantes.push(lider);
      }
    }

    return estudiantes;
  }
}
