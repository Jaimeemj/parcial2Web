import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity'
import { ProfesorService } from './profesor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity, EvaluacionEntity])],
  providers: [ProfesorService],
  exports: [ProfesorService],
})
export class ProfesorModule {}
