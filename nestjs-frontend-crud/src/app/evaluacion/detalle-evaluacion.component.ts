import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from './../services/evaluacion.service';
import { Evaluacion } from '../models/evaluacion';

@Component({
  selector: 'app-detalle-evaluacion',
  templateUrl: './detalle-evaluacion.component.html',
  styleUrls: ['./detalle-evaluacion.component.css']
})
export class DetalleEvaluacionComponent implements OnInit {
  evaluacion: Evaluacion | undefined;

  constructor(
    private evaluacionService: EvaluacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvaluacion();
  }

  loadEvaluacion(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.evaluacionService.detail(id).subscribe(
      data => {
        this.evaluacion = data;
      },
      err => {
        console.error('Error al cargar la evaluación', err);
        this.router.navigate(['/evaluaciones']);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/evaluaciones']);
  }
}
