import { Component, OnInit } from '@angular/core';
import { CursoService } from './../services/curso.service';
import { Curso } from '../models/curso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css']
})
export class ListaCursoComponent implements OnInit {

  cursos: Curso[] = [];
  listaVacia = undefined;

  constructor(
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.lista().subscribe(
      data => {
        this.cursos = data;
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
        this.cursoService.delete(id).subscribe(res => this.cargarCursos());
        Swal.fire(
          'OK',
          'Curso eliminado',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Curso a salvo',
          'error'
        );
      }
    });
  }
}
