export class Matricula {
    id?: number;
    codigo: string;
    fechaInscripcion: Date;
    calificacionFinal?: number;
  estudianteId: number | null;
  cursoId: number | null;

    constructor(id: number, codigo: string, fechaInscripcion: Date, calificacionFinal?: number) {
        this.id = id;
        this.codigo = codigo;
        this.fechaInscripcion = fechaInscripcion;
        this.calificacionFinal = calificacionFinal;
    }
}
