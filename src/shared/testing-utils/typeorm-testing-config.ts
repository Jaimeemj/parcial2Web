import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../../evaluacion/evaluacion.entity';
import { ProfesorEntity } from '../../profesor/profesor.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      ProfesorEntity,
      ProyectoEntity,
      EstudianteEntity,
      EvaluacionEntity
    ],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([
    ProfesorEntity,
    ProyectoEntity,
    EstudianteEntity,
    EvaluacionEntity
  ]),
];
