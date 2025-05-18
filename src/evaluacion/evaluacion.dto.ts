import { IsOptional, IsInt } from 'class-validator';

export class EvaluacionDTO {
  @IsInt()
  proyectoId: number;

  @IsOptional()
  @IsInt()
  evaluadorId?: number;
}
