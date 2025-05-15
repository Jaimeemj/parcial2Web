import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { ProfesorDTO } from './profesor.dto';

@Injectable()
export class ProfesorService {

        constructor(
    
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
        ){}

        async crearEstudiante(ProfesorInfo: ProfesorDTO ): Promise<ProfesorEntity> {
            if (ProfesorInfo.extension==5 ) {
        const estudiante = this.profesorRepository.create({
            id:ProfesorInfo.id,
            cedula:ProfesorInfo.cedula,
            nombre:ProfesorInfo.nombre,
            departamento:ProfesorInfo.departamento,
            extension:ProfesorInfo.extension,
            esParEvaluado:ProfesorInfo.esParEvaluado,
            mentorias:[],
            evaluaciones:[]

        })
        return await this.profesorRepository.save(estudiante);
    }
    else{
        throw new Error('EL promedio no esta dentro de lo esperado')    }
        }
}
