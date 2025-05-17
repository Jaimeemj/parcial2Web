import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { ProfesorDTO } from './profesor.dto';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';

@Injectable()
export class ProfesorService {

        constructor(
    
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
        @InjectRepository(EvaluacionEntity)
        private readonly evaluacionRepository: Repository<EvaluacionEntity>
        ){}

        async crearProfesor(ProfesorInfo: ProfesorDTO ): Promise<ProfesorEntity> {
            if (ProfesorInfo.extension==5 ) {
        const profesor = this.profesorRepository.create({

            cedula:ProfesorInfo.cedula,
            nombre:ProfesorInfo.nombre,
            departamento:ProfesorInfo.departamento,
            extension:ProfesorInfo.extension,
            esParEvaluado:ProfesorInfo.esParEvaluado,
            mentorias:[],
            evaluaciones:[]

        })
        return await this.profesorRepository.save(profesor);
    }
    else{
        throw new Error('El profesor no tiene la extension esperada')    }
        }

        async asignarEvaulador(id: number,evaluacionId: number){
        {
                const profesor = await this.profesorRepository.findOne({
      where: { id: Number(id)   }
    });
                    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id: Number(id)   }
    });
        if (!profesor ) {
      throw new Error('Profesor no existe');
    }
         if (!evaluacion ) {
      throw new Error('La evaluacion no existe');
    }
            if (profesor.evaluaciones.length < 3) {
                profesor.evaluaciones.push(evaluacion);
                evaluacion.evaluador = profesor;
            }
            else{
                      throw new Error('El evaluador tiene 3 o mas evaluaciones');
            }
            
        }
        }
}
