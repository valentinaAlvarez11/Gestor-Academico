import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatriculaService } from './../services/matricula.service';
import { Matricula } from './../models/matricula';

@Component({
  selector: 'app-nuevo-matricula',
  templateUrl: './nuevo-matricula.component.html',
  styleUrls: ['./nuevo-matricula.component.css']
})
export class NuevoMatriculaComponent implements OnInit {
  codigo: string = '';
  fechaInscripcion: Date | null = null;
  calificacionFinal?: number;
  estudianteId: number | null = null;
  cursoId: number | null = null;

  constructor(
    private matriculaService: MatriculaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onCreate(): void {
    if (!this.fechaInscripcion || this.estudianteId === null || this.cursoId === null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    const nuevaMatricula = new Matricula(0, this.codigo, this.fechaInscripcion, this.calificacionFinal);
    nuevaMatricula.estudianteId = this.estudianteId;
    nuevaMatricula.cursoId = this.cursoId;

    this.matriculaService.save(nuevaMatricula).subscribe(
      data => {
        this.toastr.success('Matrícula creada correctamente', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/matriculas']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/matriculas']);
  }
}
