import { Injectable } from '@nestjs/common';
import { EvaluacionEntity } from './evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionService {

    constructor(

    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
    ){}
}
