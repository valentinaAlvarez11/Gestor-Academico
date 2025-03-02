export class Departamento {
    id?: number;
    nombre: string;
    codigo: string;

    constructor(nombre: string, codigo: string) {
        this.nombre = nombre;
        this.codigo = codigo;
    }
}