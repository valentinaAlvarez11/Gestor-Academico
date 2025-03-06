export class Evaluacion {
  id?: number;
  nombre: string;
  fecha: Date;

  constructor(id: number, nombre: string, fecha: Date) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
  }
}
