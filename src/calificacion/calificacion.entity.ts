import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Entity('calificaciones')
export class CalificacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  nota: number;

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.calificaciones, { eager: true, onDelete: 'CASCADE' })
  estudiante: EstudianteEntity;

  @ManyToOne(() => EvaluacionEntity, (evaluacion) => evaluacion.calificaciones, { eager: true, onDelete: 'CASCADE' })
  evaluacion: EvaluacionEntity;
}
