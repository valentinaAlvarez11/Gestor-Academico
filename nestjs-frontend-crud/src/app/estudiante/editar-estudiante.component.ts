import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from './../services/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../models/estudiante';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit {
  estudiante: Estudiante = new Estudiante(0, '', new Date(), '');

  constructor(
    private estudianteService: EstudianteService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEstudiante();
  }

  loadEstudiante(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.estudianteService.detail(id).subscribe(
      data => {
        this.estudiante = data;
      },
      err => {
        this.toastr.error('Error al cargar el estudiante', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/estudiantes']);
      }
    );
  }

  onUpdate(): void {
    this.estudianteService.update(this.estudiante.id!, this.estudiante).subscribe(
      data => {
        this.toastr.success('Estudiante actualizado con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/estudiantes']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/estudiantes']);
  }
}
