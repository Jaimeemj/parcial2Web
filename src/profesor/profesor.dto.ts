import { Long } from "typeorm";

export class ProfesorDTO {
        
        id: Long;
      
        
        cedula:number;  
        
        
        nombre:String;

        
        departamento:String;

        
        extension:number;
        
        
        esParEvaluado:boolean;


}