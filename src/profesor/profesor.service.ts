import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { ProfesorDTO } from './profesor.dto';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

@Injectable()
export class ProfesorService {

        constructor(
    
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
        @InjectRepository(EvaluacionEntity)
        private readonly evaluacionRepository: Repository<EvaluacionEntity>,
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
        ){}

        async crearProfesor(profesorInfo: ProfesorDTO): Promise<ProfesorEntity> {
            const proyectos: ProyectoEntity[] = [];

            if (profesorInfo.mentoriasIds && profesorInfo.mentoriasIds.length > 0) {
                for (let index = 0; index < profesorInfo.mentoriasIds.length; index++) {
                const id = profesorInfo.mentoriasIds[index];
                const proy = await this.proyectoRepository.findOne({
                    where: { id: Number(id) },
                    relations: ['lider', 'evaluaciones'],
                });

                if (!proy) {
                    throw new Error(`Proyecto con ID ${id} no existe`);
                }

                proyectos.push(proy);
                }
            }

            const evaluaciones: EvaluacionEntity[] = [];

            if (profesorInfo.evaluacionesIds && profesorInfo.evaluacionesIds.length > 0) {
                for (let index = 0; index < profesorInfo.evaluacionesIds.length; index++) {
                const id = profesorInfo.evaluacionesIds[index];
                const evaluacion = await this.evaluacionRepository.findOne({
                    where: { id: Number(id) },
                    relations: ['proyecto', 'evaluador'], 
                });

                if (!evaluacion) {
                    throw new Error(`Evaluación con ID ${id} no existe`);
                }

                evaluaciones.push(evaluacion);
                }
            }

            if (profesorInfo.extension === 5) {
                const profesor = this.profesorRepository.create({
                cedula: profesorInfo.cedula,
                nombre: profesorInfo.nombre,
                departamento: profesorInfo.departamento,
                extension: profesorInfo.extension,
                esParEvaluado: profesorInfo.esParEvaluado,
                mentorias: proyectos,
                evaluaciones: evaluaciones,
                });

                if (profesorInfo.mentoriasIds && profesorInfo.mentoriasIds.length > 0) {
                for (let index = 0; index < profesorInfo.mentoriasIds.length; index++) {
                const id = profesorInfo.mentoriasIds[index];
                const proy = await this.proyectoRepository.findOne({
                    where: { id: Number(id) },
                    relations: ['lider', 'evaluaciones'],
                });

                if (!proy) {
                    throw new Error(`Proyecto con ID ${id} no existe`);
                }

                proyectos.push(proy);
                }
            }
        const guardarProfesor = await this.profesorRepository.save(profesor);

                for (const evaluacion of evaluaciones) {
                    evaluacion.evaluador = guardarProfesor;
                    await this.evaluacionRepository.save(evaluacion);

                }
                for (const proyecto of proyectos) {
                    proyecto.mentor = guardarProfesor;
                    await this.proyectoRepository.save(proyecto);
                }
        const profesorActualizado = await this.profesorRepository.findOne({
          where: { id: guardarProfesor.id },
          relations: ['mentorias', 'mentorias.evaluaciones', 'mentorias.mentor', 'mentorias.lider']
        });

        if (!profesorActualizado) {
          throw new Error('No se pudo encontrar el profesor actualizado');
        }

        return profesorActualizado;
            } else {
                throw new Error('El profesor no tiene la extensión esperada');
            }
            }


       
            async asignarEvaluador(id: number, evaluacionId: number) {
  const profesor = await this.profesorRepository.findOne({
    where: { id },
    relations: ['evaluaciones'],
  });

  if (!profesor) {
    throw new Error('Profesor no existe');
  }

  const evaluacion = await this.evaluacionRepository.findOne({
    where: { id: evaluacionId },
    relations: ['evaluador'],
  });

  if (!evaluacion) {
    throw new Error('La evaluación no existe');
  }
  if (profesor.evaluaciones.length >= 3) {
    throw new Error('El evaluador tiene 3 o más evaluaciones');
  }


  profesor.evaluaciones.push(evaluacion);
  evaluacion.evaluador = profesor;


  await this.profesorRepository.save(profesor);
  await this.evaluacionRepository.save(evaluacion);

  return {
    message: 'Evaluador asignado correctamente',
    evaluacionId: evaluacion.id,
    profesorId: profesor.id
  };
}

}
