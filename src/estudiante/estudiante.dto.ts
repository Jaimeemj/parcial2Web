import { IsInt, IsString, IsNumber, Min, Max, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class EstudianteDTO {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;


  @IsInt()
  @IsNotEmpty()
  semestre: number;

  @IsString()
  programa: string;

  @IsNumber()
  @IsNotEmpty()
  promedio: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  proyectosIds?: number[]; 
}
