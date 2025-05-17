import { IsBoolean, IsInt, IsString } from "class-validator";
import { Long } from "typeorm";

export class ProfesorDTO {
        

      
        @IsInt()
        cedula:number;  
        
        @IsString()
        nombre:String;

        @IsString()
        departamento:String;

        @IsInt()
        extension:number;
        
        @IsBoolean()
        esParEvaluado:boolean;


}