import { Long } from "typeorm";
import { IsInt, IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class EstudianteDTO {
      
        @IsInt()
        cedula: number;
    
        @IsInt()
        @IsNotEmpty()
        semestre: number;  
        
        @IsString()
        programa: string;  
    
        
        @IsNumber()
        @IsNotEmpty()
        promedio: number;  
}