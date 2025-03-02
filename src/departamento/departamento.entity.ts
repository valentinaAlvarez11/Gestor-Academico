import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";

@Entity({ name: 'departamento' })
export class DepartamentoEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    codigo: string;


    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    nombre: string;

    @OneToMany(() => ProfesorEntity, (profesor) => profesor.departamento)
    profesores: ProfesorEntity[];
}
