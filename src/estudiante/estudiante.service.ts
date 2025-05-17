import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { EstudianteDTO } from './estudiante.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
@Injectable()
export class EstudianteService {

    constructor(

    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
    ){}

    
  async crearEstudiante(estudianteDto: EstudianteDTO ): Promise<EstudianteEntity> {
    if (estudianteDto.promedio>3.2 && estudianteDto.semestre>=4) {
        const estudiante = this.estudianteRepository.create({
            cedula:estudianteDto.cedula,
            semestre:estudianteDto.semestre,
            programa:estudianteDto.programa,
            promedio:estudianteDto.promedio,
            proyectos:[]

        })
        return await this.estudianteRepository.save(estudiante);
    }
    else{
        throw new Error('EL promedio no esta dentro de lo esperado')    }

    
  }
  async eliminarEstudiante(id: Long): Promise<void> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: Number(id)   }
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
