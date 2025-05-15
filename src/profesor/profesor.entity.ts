import { ProyectoEntity } from "src/proyecto/proyecto.entity";
import { Column, Entity, IntegerType, Long, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class ProfesorEntity {

        @PrimaryColumn('uuid')
        id: Long;
      
        @Column()
        cedula:IntegerType;  
        
        @Column()
        nombre:String;

        @Column()
        departamento:String;

        @Column()
        extension:IntegerType;
        
        @Column()
        esParEvaluado:boolean;

        
        @OneToMany(() => ProyectoEntity, proyecto => proyecto.mentor )
        mentorias: ProyectoEntity[];
    
        
}
