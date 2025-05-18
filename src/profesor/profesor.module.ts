import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity'
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity, EvaluacionEntity, ProyectoEntity])
],
  providers: [ProfesorService],
  exports: [ProfesorService],
  controllers: [ProfesorController],
})
export class ProfesorModule {}
