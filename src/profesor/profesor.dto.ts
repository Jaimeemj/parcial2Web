import { IsBoolean, IsInt, IsString, IsOptional, IsArray } from 'class-validator';

export class ProfesorDTO {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsString()
  departamento: string;

  @IsInt()
  extension: number;

  @IsBoolean()
  esParEvaluado: boolean;

  @IsOptional()
  @IsArray()
  mentoriasIds: number[]; 

  @IsOptional()
  @IsArray()
  evaluacionesIds: number[];
}