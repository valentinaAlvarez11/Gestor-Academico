import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from './../services/curso.service';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit {
  curso: Curso | undefined;

  constructor(
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurso();
  }

  loadCurso(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cursoService.detail(id).subscribe(
      data => {
        this.curso = data;
      },
      err => {
        console.error('Error al cargar el curso', err);
        this.router.navigate(['/cursos']);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }
}
