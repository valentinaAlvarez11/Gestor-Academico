import { Component, OnInit } from '@angular/core';
import { EstudianteService } from './../services/estudiante.service';
import { Estudiante } from '../models/estudiante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-estudiante',
  templateUrl: './lista-estudiante.component.html',
  styleUrls: ['./lista-estudiante.component.css']
})
export class ListaEstudianteComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  listaVacia = undefined;

  constructor(
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.estudianteService.lista().subscribe(
      data => {
        this.estudiantes = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.estudianteService.delete(id).subscribe(res => this.cargarEstudiantes());
        Swal.fire(
          'OK',
          'Estudiante eliminado',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Estudiante a salvo',
          'error'
        );
      }
    });
  }
}
