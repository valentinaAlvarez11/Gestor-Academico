export class Evaluacion {
  id?: number;
  nombre: string;
  fecha: Date;
  curso: string;
  descripcion: string;

  constructor(id: number, nombre: string, fecha: Date, descripcion: string, curso: string) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.curso = curso;
  }
}
