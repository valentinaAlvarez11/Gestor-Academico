import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluacionService } from './../services/evaluacion.service';
import { CursoService } from './../services/curso.service';
import { Curso } from '../models/curso';
import { Evaluacion } from '../models/evaluacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-evaluacion',
  templateUrl: './nueva-evaluacion.component.html',
  styleUrls: ['./nueva-evaluacion.component.css']
})
export class NuevaEvaluacionComponent implements OnInit {
  nombre: string = '';
  fecha: Date | undefined;
  curso: string = '';
  descripcion: string = '';
  cursos: Curso[] = [];

  constructor(
    private evaluacionService: EvaluacionService,
    private cursoService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.lista().subscribe(
      data => {
        this.cursos = data;
      },
      err => {
        console.error('Error al cargar los cursos', err);
      }
    );
  }

  onCreate(): void {
    const curso = this.cursos.find(curso => curso.nombre === this.curso);
    if (!curso) {
      Swal.fire('Error', 'Curso no válido', 'error');
      return;
    }

    if (!this.fecha) {
      Swal.fire('Error', 'Fecha no válida', 'error');
      return;
    }
    const evaluacion = new Evaluacion(0, this.nombre, this.fecha, this.descripcion, this.curso);
    this.evaluacionService.save(evaluacion).subscribe(
      data => {
        Swal.fire('Evaluación creada', 'La evaluación ha sido creada con éxito', 'success');
        this.router.navigate(['/evaluaciones']);
      },
      err => {
        Swal.fire('Error', 'Hubo un problema al crear la evaluación', 'error');
      }
    );
  }

  volver(): void {
    this.router.navigate(['/evaluaciones']);
  }
}
