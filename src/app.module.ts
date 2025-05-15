import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ProfesorEntity } from './profesor/profesor.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';

@Module({
  imports: [
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
    EvaluacionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [
        ProfesorEntity,
        ProyectoEntity,
        EstudianteEntity,
        EvaluacionEntity

      ],
      dropSchema: true, 
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}