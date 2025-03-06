import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from './../services/curso.service';
import { ProfesorService } from './../services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { Curso } from '../models/curso';
import { Profesor } from '../models/profesor';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {
  curso: Curso = new Curso(0, '', '', '', new Profesor(0, '', new Date(), { id: 0, codigo: '', nombre: '' }));
  profesorId: number | null = null;
  profesores: Profesor[] = [];

  constructor(
    private cursoService: CursoService,
    private profesorService: ProfesorService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProfesores();
    this.loadCurso();
  }

  cargarProfesores(): void {
    this.profesorService.lista().subscribe(
      data => {
        this.profesores = data;
      },
      err => {
        this.toastr.error('Error al cargar los profesores', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  loadCurso(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cursoService.detail(id).subscribe(
      data => {
        this.curso = data;
        this.profesorId = this.curso.profesor.id ?? null;
      },
      err => {
        this.toastr.error('Error al cargar el curso', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/cursos']);
      }
    );
  }

  onUpdate(): void {
    if (this.profesorId === null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    const profesor = this.profesores.find(prof => prof.id === this.profesorId);
    if (!profesor) {
      this.toastr.error('Profesor no válido', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    this.curso.profesor = profesor;

    this.cursoService.update(this.curso.id!, this.curso).subscribe(
      data => {
        this.toastr.success('Curso actualizado con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/cursos']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }
}
