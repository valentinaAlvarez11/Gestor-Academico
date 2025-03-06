export class Estudiante {
    id?: number;
    nombre: string;
    fechaNacimiento: Date;
    matricula: string;

    constructor(id: number, nombre: string, fechaNacimiento: Date, matricula: string) {
        this.id = id;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.matricula = matricula;
    }
}