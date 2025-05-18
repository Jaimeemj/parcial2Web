import { IsInt, IsString, IsNumber, Min, Max, IsNotEmpty, IsArray } from 'class-validator';

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


  @IsArray()
  @IsInt({ each: true })
  proyectosIds?: number[]; 
}
