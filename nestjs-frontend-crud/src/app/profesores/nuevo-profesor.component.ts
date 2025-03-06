import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './../services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Departamento } from '../models/departamento';
import { DepartamentoService } from './../services/departamento.service'; // Import the DepartamentoService

@Component({
  selector: 'app-nuevo-profesor',
  templateUrl: './nuevo-profesor.component.html',
  styleUrls: ['./nuevo-profesor.component.css']
})
export class NuevoProfesorComponent implements OnInit {
  nombre = '';
  fechaContratacion: Date | null = null;
  departamentoId: number | null = null;
  departamentos: Departamento[] = []; // Array to hold the list of departments

  constructor(
    private profesorService: ProfesorService,
    private toastr: ToastrService,
    private router: Router,
    private departamentoService: DepartamentoService // Inject the DepartamentoService
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos(); // Load the departments when the component initializes
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

  onCreate(): void {
    if (this.fechaContratacion === null || this.departamentoId === null) {
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

    const profesor = {
      nombre: this.nombre,
      fechaContratacion: this.fechaContratacion,
      departamento: departamento
    };

    this.profesorService.save(profesor).subscribe(
      data => {
        this.toastr.success('Profesor creado con éxito', 'OK', {
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