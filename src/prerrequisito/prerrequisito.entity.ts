import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CursoEntity } from '../curso/curso.entity';

@Entity({ name: 'prerrequisitos' })
export class PrerrequisitoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CursoEntity, (curso) => curso.prerrequisitos, { onDelete: 'CASCADE' })
  cursoActual: CursoEntity;

  @ManyToOne(() => CursoEntity, { onDelete: 'CASCADE' }) 
  cursoRequerido: CursoEntity;
}
