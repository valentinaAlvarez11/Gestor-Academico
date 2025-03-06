import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from './../services/estudiante.service';
import { Estudiante } from '../models/estudiante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-estudiante',
  templateUrl: './nuevo-estudiante.component.html',
  styleUrls: ['./nuevo-estudiante.component.css']
})
export class NuevoEstudianteComponent implements OnInit {
  nombre: string;
  fechaNacimiento: Date;

  constructor(
    private estudianteService: EstudianteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const estudiante = new Estudiante(0, this.nombre, this.fechaNacimiento, 'defaultMatricula');
    this.estudianteService.save(estudiante).subscribe(
      data => {
        Swal.fire('Estudiante creado', 'El estudiante ha sido creado con éxito', 'success');
        this.router.navigate(['/estudiantes']);
      },
      err => {
        Swal.fire('Error', 'Hubo un problema al crear el estudiante', 'error');
      }
    );
  }

  volver(): void {
    this.router.navigate(['/estudiantes']);
  }
}
