import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  Max,
  Min
} from 'class-validator';

export class ProyectoDTO {
  @IsString()
  titulo: string;

  @IsString()
  area: string;

  @IsNumber()
  presupuesto: number;

  @IsNumber()
  notaFinal: number;

  @IsNumber()
  estado: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsOptional()
  @IsInt()
  liderId?: number;

  @IsOptional()
  @IsInt()
  mentorId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  evaluacionesIds?: number[];
}
