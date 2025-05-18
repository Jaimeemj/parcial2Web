import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { EstudianteDTO } from './estudiante.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
@Injectable()
export class EstudianteService {

    constructor(

    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,

    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
    ){}

    
  async crearEstudiante(estudianteDto: EstudianteDTO ): Promise<EstudianteEntity> {
      const proyectos: ProyectoEntity[] = [];
        if (estudianteDto.proyectosIds && Array.isArray(estudianteDto.proyectosIds)) {
          for (const id of estudianteDto.proyectosIds) {
            const proyecto = await this.proyectoRepository.findOne({where: { id: Number(id) }, relations: ['lider'],});
            
            if (!proyecto) {
              throw new Error(`Proyecto con ID ${id} no existe`);
            }
            proyectos.push(proyecto);
          }
        }
      
      if (estudianteDto.promedio>3.2 && estudianteDto.semestre>=4) {
        const estudiante = this.estudianteRepository.create({
          cedula:estudianteDto.cedula,
          nombre:estudianteDto.nombre,
          semestre:estudianteDto.semestre,
          programa:estudianteDto.programa,
          promedio:estudianteDto.promedio,
          proyectos: proyectos
        })
        const guardarEstudiante = await this.estudianteRepository.save(estudiante);
        for (const proyecto of proyectos) {
            proyecto.lider = estudiante;
            await this.proyectoRepository.save(proyecto);
        }

        const estudianteActualizado = await this.estudianteRepository.findOne({
          where: { id: guardarEstudiante.id },
          relations: ['proyectos', 'proyectos.evaluaciones', 'proyectos.mentor', 'proyectos.lider']
        });



      if(!estudianteActualizado) {
        throw new Error('No se pudo encontrar el estudiante después de guardarlo');
      }
      return estudianteActualizado;
      }
      else{
        throw new Error('EL promedio no esta dentro de lo esperado'); 
      }
      } 
  



  async eliminarEstudiante(id: number): Promise<void> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: Number(id) },
      relations: ['proyectos'],
    });

    if (!estudiante) {
      throw new Error('Estudiante no encontrado');
    }
    if (estudiante.proyectos.length > 0) {
      throw new Error('El estudiante aun tiene proyectos activos');
    }
  
    await this.estudianteRepository.remove(estudiante);
  }


}
