import { Profesor } from "./profesor";

//crear curso
export class Curso {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    profesor: Profesor;

    constructor(id: number, codigo: string, nombre: string, descripcion: string, profesor: Profesor) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.profesor = profesor;
    }
}