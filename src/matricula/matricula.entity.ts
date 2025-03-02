import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { CursoEntity } from '../curso/curso.entity';

@Entity({ name: 'matriculas' }) // Nombre de la tabla en la BD
export class MatriculaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaInscripcion: Date;

  @Column({ type: 'float', nullable: true })
  calificacionFinal?: number;

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.matriculas, { onDelete: 'CASCADE' })
  estudiante: EstudianteEntity;

  @ManyToOne(() => CursoEntity, (curso) => curso.matriculas, { onDelete: 'CASCADE' })
  curso: CursoEntity;
}
