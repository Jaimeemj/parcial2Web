import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import { Column, Entity, IntegerType, Long, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class ProyectoEntity {
    
            @PrimaryColumn('uuid')
            id: Long;
          
            @Column()
            titulo:String;  
            
            @Column()
            area:String;
    
            @Column()
            presupuesto:IntegerType;
    
            @Column()
            notaFinal:IntegerType;
            
            @Column()
            estado:IntegerType;

            @Column()
            fechaInicio:String;

            @Column()
            fechaFIn:String;

            
            @ManyToOne(()=> EstudianteEntity,estudiante => estudiante.proyectos)
            lider: EstudianteEntity;
            @OneToMany(() =>EvaluacionEntity,evaluacion =>evaluacion.proyecto)
            evaluaciones: EvaluacionEntity[];
        
            @ManyToOne(()=> ProfesorEntity,profesor =>profesor.mentorias)
            mentor:ProfesorEntity;
}
