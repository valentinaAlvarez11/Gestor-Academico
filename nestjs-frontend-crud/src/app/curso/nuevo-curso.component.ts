import { Component, OnInit } from '@angular/core';
import { CursoService } from './../services/curso.service';
import { ProfesorService } from './../services/profesor.service';
import { Curso } from '../models/curso';
import { Profesor } from '../models/profesor';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css']
})
export class NuevoCursoComponent implements OnInit {

  codigo: string;
  nombre: string;
  descripcion: string;
  profesorId: number;
  profesores: Profesor[] = [];

  constructor(
    private cursoService: CursoService,
    private profesorService: ProfesorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores(): void {
    this.profesorService.lista().subscribe(
      data => {
        this.profesores = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  onCreate(): void {
    const profesor = this.profesores.find(prof => prof.id === this.profesorId);
    if (!profesor) {
      Swal.fire('Error', 'Profesor no válido', 'error');
      return;
    }

    const curso = new Curso(0, this.codigo, this.nombre, this.descripcion, profesor);
    this.cursoService.save(curso).subscribe(
      data => {
        Swal.fire('Curso creado', 'El curso ha sido creado con éxito', 'success');
        this.router.navigate(['/']);
      },
      err => {
        Swal.fire('Error', 'Hubo un problema al crear el curso', 'error');
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
