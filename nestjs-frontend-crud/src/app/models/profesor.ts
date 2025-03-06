import { Departamento } from "./departamento";

export class Profesor {
    id?: number;
    nombre: string;
    fechaContratacion: Date;
    departamento: Departamento;

    constructor(id: number, nombre: string, fechaContratacion: Date, departamento: Departamento) {
        this.id = id;
        this.nombre = nombre;
        this.fechaContratacion = fechaContratacion;
        this.departamento = departamento;
    }
}