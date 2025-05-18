import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProyectoEntity,
      EstudianteEntity,
      EvaluacionEntity,
      ProfesorEntity
    ])

  ],
  controllers: [ProyectoController],
  providers: [ProyectoService],
})
export class ProyectoModule {}
