import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluacionEntity,
      ProyectoEntity,
      ProfesorEntity
    ])
  ],
  providers: [EvaluacionService],
  exports: [EvaluacionService],
  controllers: [EvaluacionController],
})
export class EvaluacionModule {}
