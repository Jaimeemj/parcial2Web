import { ProyectoEntity } from "src/proyecto/proyecto.entity";
import { Column, Entity, IntegerType, OneToMany, PrimaryColumn } from "typeorm";
import { Long } from "typeorm/driver/mongodb/bson.typings";

@Entity()
export class EstudianteEntity {
    @PrimaryColumn('uuid')
    id: Long;
  
    @Column()
    cedula: IntegerType;

    @Column()
    semestre:IntegerType;  
    
    @Column()
    programa:String;  

    @Column()
    promedio:IntegerType;  

    
    @OneToMany(() => ProyectoEntity, proyecto => proyecto.lider)
    proyectos: ProyectoEntity[];




}
