import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from './../services/evaluacion.service';
import { CursoService } from './../services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { Evaluacion } from '../models/evaluacion';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-editar-evaluacion',
  templateUrl: './editar-evaluacion.component.html',
  styleUrls: ['./editar-evaluacion.component.css']
})
export class EditarEvaluacionComponent implements OnInit {
  evaluacion: Evaluacion = new Evaluacion(0, '', new Date(), '', '');
  cursos: Curso[] = [];

  constructor(
    private evaluacionService: EvaluacionService,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEvaluacion();
    this.loadCursos();
  }

  loadEvaluacion(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.evaluacionService.detail(id).subscribe(
      data => {
        this.evaluacion = data;
      },
      err => {
        this.toastr.error('Error al cargar la evaluación', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/evaluaciones']);
      }
    );
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

  onUpdate(): void {
    const curso = this.cursos.find(curso => curso.nombre === this.evaluacion.curso);
    if (!curso) {
      this.toastr.error('Curso no válido', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    this.evaluacion.curso = curso.nombre;
    this.evaluacionService.update(this.evaluacion.id!, this.evaluacion).subscribe(
      data => {
        this.toastr.success('Evaluación actualizada con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/evaluaciones']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/evaluaciones']);
  }
}
