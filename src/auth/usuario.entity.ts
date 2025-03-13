import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Rol {
  ADMIN = 'admin',
  PROFESOR = 'profesor',
  ESTUDIANTE = 'estudiante',
}

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Rol, default: Rol.ESTUDIANTE })
  rol: Rol;
}
