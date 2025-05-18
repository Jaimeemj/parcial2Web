import { EvaluacionEntity } from "../evaluacion/evaluacion.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Column, Entity, IntegerType, Long, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity {

        @PrimaryGeneratedColumn('increment', { type: 'bigint' })
        id: number;
      
        @Column()
        cedula:number;  
        
        @Column()
        nombre:String;

        @Column()
        departamento:String;

        @Column()
        extension:number;
        
        @Column()
        esParEvaluado:boolean;

        
        @OneToMany(() => ProyectoEntity, proyecto => proyecto.mentor )
        mentorias: ProyectoEntity[];

        @OneToMany(() => EvaluacionEntity, evaluacion =>evaluacion.evaluador )
        evaluaciones:EvaluacionEntity[];
        
        
}
