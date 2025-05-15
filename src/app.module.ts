import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';

@Module({
  imports: [
    //Aqui van los modules Module1,Module2
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [

      ],
      dropSchema: true, 
      synchronize: true,
    }),
    EvaluacionModule,
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}