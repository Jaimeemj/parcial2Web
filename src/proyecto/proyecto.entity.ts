import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
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
    
            @Column()
            notaFinal:number;
            
            @Column()
            estado:number;

            @Column()
            fechaInicio:String;

            @Column()
            fechaFin:String;

            
            @ManyToOne(()=> EstudianteEntity,estudiante => estudiante.proyectos)
            lider: EstudianteEntity;
            @OneToMany(() =>EvaluacionEntity,evaluacion =>evaluacion.proyecto)
            evaluaciones: EvaluacionEntity[];
        
            @ManyToOne(()=> ProfesorEntity,profesor =>profesor.mentorias)
            mentor:ProfesorEntity;
}
