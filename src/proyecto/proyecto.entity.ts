import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { EvaluacionEntity } from "../evaluacion/evaluacion.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { Column, Entity, IntegerType, Long, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoEntity {
    
            @PrimaryGeneratedColumn('increment', { type: 'bigint' })
            id: number;
          
            @Column()
            titulo:String;  
            
            @Column()
            area:String;
    
            @Column()
            presupuesto:number;
    
            @Column('float')
            notaFinal:number;
            
            @Column()
            estado:number;

            @Column()
            fechaInicio:String;

            @Column()
            fechaFin:String;

            
            @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.proyectos, { nullable: true })
            lider: EstudianteEntity | null;
                        
            @OneToMany(() =>EvaluacionEntity,evaluacion =>evaluacion.proyecto)
            evaluaciones: EvaluacionEntity[];
        
            @ManyToOne(()=> ProfesorEntity,profesor =>profesor.mentorias)
            mentor:ProfesorEntity;
}
