import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CursoEntity } from '../curso/curso.entity';
import { CalificacionEntity } from '../calificacion/calificacion.entity';

@Entity('evaluaciones')
export class EvaluacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => CursoEntity, (curso) => curso.evaluaciones, { onDelete: 'CASCADE' })
  curso: CursoEntity;

  @OneToMany(() => CalificacionEntity, (calificacion) => calificacion.evaluacion)
  calificaciones: CalificacionEntity[];
}
