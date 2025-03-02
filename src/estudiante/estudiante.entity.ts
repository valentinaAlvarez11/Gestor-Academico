import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MatriculaEntity } from '../matricula/matricula.entity';
import { CalificacionEntity } from 'src/calificacion/calificacion.entity';

@Entity({ name: 'estudiantes' }) // Nombre de la tabla en la BD
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @OneToMany(() => MatriculaEntity, (matricula) => matricula.estudiante)
  matriculas: MatriculaEntity[];

  @OneToMany(() => CalificacionEntity, (calificacion) => calificacion.estudiante)
  calificaciones: CalificacionEntity[];
}
