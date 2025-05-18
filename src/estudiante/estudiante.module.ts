import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ProyectoEntity])],
  providers: [EstudianteService],
  controllers: [EstudianteController],
})
export class EstudianteModule {}
