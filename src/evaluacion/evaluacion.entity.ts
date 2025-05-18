import { ProfesorEntity } from "../profesor/profesor.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Entity, Long, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvaluacionEntity {
    
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: Number;
    
    @ManyToOne(()=> ProyectoEntity,proyecto => proyecto.evaluaciones)
    proyecto:ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.evaluaciones, { nullable: true })
    evaluador: ProfesorEntity |null;


    
}
