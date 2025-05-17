import { ProyectoEntity } from "src/proyecto/proyecto.entity";
import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('int')
  cedula: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column('int')
  semestre: number;

  @Column({ type: 'varchar', length: 100 })
  programa: string;

  @Column('int')
  promedio: number;

  @OneToMany(() => ProyectoEntity, proyecto => proyecto.lider)
  proyectos: ProyectoEntity[];
}
