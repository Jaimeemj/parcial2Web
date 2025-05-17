import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Long, Repository } from 'typeorm';
import { ProyectoDTO } from './proyecto.dto';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

@Injectable()
export class ProyectoService {

     constructor(
        
            @InjectRepository(ProyectoEntity)
            private readonly proyectoRepository: Repository<ProyectoEntity>,
            /*@InjectRepository(EvaluacionEntity)
            private readonly evaluacionRepository: Repository<EvaluacionEntity>*/
            ){}
 async crearProfesor(proyectoInfo: ProyectoDTO ): Promise<ProyectoEntity> {
    if (proyectoInfo.presupuesto > 0 && proyectoInfo.titulo.length > 15) {
        const proyecto = this.proyectoRepository.create({
            titulo: proyectoInfo.titulo,
            area: proyectoInfo.area,
            presupuesto: proyectoInfo.presupuesto,
            notaFinal: proyectoInfo.notaFinal,
            estado: proyectoInfo.estado,
            fechaInicio: proyectoInfo.fechaInicio,
            fechaFin: proyectoInfo.fechaFin,
            lider: undefined,
            evaluaciones: []
        });
        return await this.proyectoRepository.save(proyecto);
    }
    // Return a rejected promise or throw an error if the condition is not met
    throw new Error('Extension must be 5');
}

async avanzarProyecto(id: Long){
   const proyecto = await this.proyectoRepository.findOne({
      where: { id: Number(id)   }

    }); 
    if (!proyecto) {
        throw new Error('No existe el proyecto');
    }
    if (proyecto.estado< 4) {
        proyecto.estado+=1;
        this.proyectoRepository.update('estado',proyecto);
        const proyecto2 = await this.proyectoRepository.findOne({
      where: { id: Number(id)   }
    }); 
        return proyecto2;
    }
    else{
        throw new Error('El proyecto ya tiene su estado en el maximo valor posible');
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
