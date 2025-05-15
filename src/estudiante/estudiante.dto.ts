import { Long } from "typeorm";

export class EstudianteDTO {

        id: Long;
      
        cedula: number;
    
        semestre: number;  
        
        programa: string;  
    
        promedio: number;  
}