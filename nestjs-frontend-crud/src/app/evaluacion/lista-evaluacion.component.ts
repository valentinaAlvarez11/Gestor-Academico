import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from './../services/evaluacion.service';
import { Evaluacion } from '../models/evaluacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-evaluacion',
  templateUrl: './lista-evaluacion.component.html',
  styleUrls: ['./lista-evaluacion.component.css']
})
export class ListaEvaluacionComponent implements OnInit {

  evaluaciones: Evaluacion[] = [];
  listaVacia = undefined;

  constructor(
    private evaluacionService: EvaluacionService
  ) { }

  ngOnInit(): void {
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones(): void {
    this.evaluacionService.lista().subscribe(
      data => {
        this.evaluaciones = data;
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
        this.evaluacionService.delete(id).subscribe(res => this.cargarEvaluaciones());
        Swal.fire(
          'OK',
          'Evaluación eliminada',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Evaluación a salvo',
          'error'
        );
      }
    });
  }
}
