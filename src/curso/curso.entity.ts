import { Column, Entity, ManyToOne, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { HorarioEntity } from "../horario/horario.entity";
import { EvaluacionEntity } from "../evaluacion/evaluacion.entity";
import { MatriculaEntity } from "../matricula/matricula.entity";
import { PrerrequisitoEntity } from "src/prerrequisito/prerrequisito.entity";

@Entity({ name: 'cursos' })
export class CursoEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
    codigo: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    // Relación con Profesor (Un Curso es impartido por un único Profesor)
    @ManyToOne(() => ProfesorEntity, profesor => profesor.cursos, { eager: true, onDelete: 'CASCADE' })
    profesor: ProfesorEntity;

    // Relación con Cursos (Prerrequisitos - Muchos a Muchos)
    @ManyToMany(() => CursoEntity)
    @JoinTable({
        name: 'curso_prerrequisitos',
        joinColumn: { name: 'curso_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'prerrequisito_id', referencedColumnName: 'id' }
    })
    prerrequisitos: CursoEntity[];

    // Relación con Horario (Un Curso tiene un Horario)
    @OneToMany(() => HorarioEntity, horario => horario.curso)
    horarios: HorarioEntity[];

    // Relación con Evaluaciones (Un Curso tiene muchas Evaluaciones)
    @OneToMany(() => EvaluacionEntity, evaluacion => evaluacion.curso)
    evaluaciones: EvaluacionEntity[];

    // Relación con Matrículas (Estudiantes inscritos)
    @OneToMany(() => MatriculaEntity, matricula => matricula.curso)
    matriculas: MatriculaEntity[];

    @OneToMany(() => PrerrequisitoEntity, (prerrequisito) => prerrequisito.cursoActual)
    prerrequisito: PrerrequisitoEntity[];

    @OneToMany(() => HorarioEntity, (horario) => horario.curso)
    horario: HorarioEntity[];
}
