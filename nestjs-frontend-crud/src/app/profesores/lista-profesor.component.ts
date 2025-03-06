import { Component, OnInit } from '@angular/core';
import { ProfesorService } from './../services/profesor.service';
import { Profesor } from '../models/profesor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-profesor',
  templateUrl: './lista-profesor.component.html',
  styleUrls: ['./lista-profesor.component.css']
})
export class ListaProfesorComponent implements OnInit {

  profesores: Profesor[] = [];
  listaVacia = undefined;

  constructor(
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores(): void {
    this.profesorService.lista().subscribe(
      data => {
        this.profesores = data;
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
        this.profesorService.delete(id).subscribe(res => this.cargarProfesores());
        Swal.fire(
          'OK',
          'Profesor eliminado',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Profesor a salvo',
          'error'
        );
      }
    });
  }
}