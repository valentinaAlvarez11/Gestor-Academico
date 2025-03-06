import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from './../services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { Departamento } from '../models/departamento';
import { DepartamentoService } from './../services/departamento.service'; // Import the DepartamentoService
import { Profesor } from '../models/profesor';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit {
  profesor: Profesor = new Profesor(0, '', new Date(), new Departamento('', ''));
  departamentoId: number | null = null;
  departamentos: Departamento[] = []; // Array to hold the list of departments

  constructor(
    private profesorService: ProfesorService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private departamentoService: DepartamentoService // Inject the DepartamentoService
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos();
    this.loadProfesor();
  }

  loadDepartamentos(): void {
    this.departamentoService.lista().subscribe(
      data => {
        this.departamentos = data;
      },
      err => {
        this.toastr.error('Error al cargar los departamentos', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  loadProfesor(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.profesorService.detail(id).subscribe(
      data => {
        this.profesor = data;
        this.departamentoId = this.profesor.departamento.id ?? null;
      },
      err => {
        this.toastr.error('Error al cargar el profesor', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/profesores']);
      }
    );
  }

  onUpdate(): void {
    if (this.departamentoId === null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    const departamento = this.departamentos.find(dept => dept.id === this.departamentoId);
    if (!departamento) {
      this.toastr.error('Departamento no válido', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    this.profesor.departamento = departamento;

    this.profesorService.update(this.profesor.id!, this.profesor).subscribe(
      data => {
        this.toastr.success('Profesor actualizado con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/profesores']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/profesores']);
  }
}