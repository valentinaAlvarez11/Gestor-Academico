import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from './../services/estudiante.service';
import { Estudiante } from '../models/estudiante';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.component.html',
  styleUrls: ['./detalle-estudiante.component.css']
})
export class DetalleEstudianteComponent implements OnInit {
  estudiante: Estudiante | undefined;
  matricula: string | undefined;

  constructor(
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEstudiante();
  }

  loadEstudiante(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.estudianteService.detail(id).subscribe(
      data => {
        this.estudiante = data;
        this.matricula = data.matricula;
      },
      err => {
        console.error('Error al cargar el estudiante', err);
        this.router.navigate(['/estudiantes']);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/estudiantes']);
  }
}
