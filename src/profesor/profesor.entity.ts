import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DepartamentoEntity } from "../departamento/departamento.entity";
import { CursoEntity } from "../curso/curso.entity";

@Entity({ name: 'profesores' })
export class ProfesorEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'date', nullable: false })
    fechaContratacion: Date;

    // Relación con Departamento (Muchos Profesores pertenecen a un Departamento)
    @ManyToOne(() => DepartamentoEntity, departamento => departamento.profesores, { eager: true, onDelete: 'CASCADE' })
    departamento: DepartamentoEntity;

    // Relación con Cursos (Un Profesor imparte muchos Cursos)
    @OneToMany(() => CursoEntity, curso => curso.profesor)
    cursos: CursoEntity[];
}
