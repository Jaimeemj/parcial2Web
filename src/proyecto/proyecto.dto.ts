import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

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
}
