import { DepartamentoService } from './../services/departamento.service';
import { Departamento } from './../models/departamento';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-departamento',
  templateUrl: './lista-departamento.component.html',
  styleUrls: ['./lista-departamento.component.css']
})
export class ListaDepartamentoComponent implements OnInit {

  departamentos: Departamento[] = [];
  listaVacia = undefined;

  constructor(
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.departamentoService.lista().subscribe(
      data => {
        this.departamentos = data;
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
        this.departamentoService.delete(id).subscribe(res => this.cargarDepartamentos());
        Swal.fire(
          'OK',
          'Departamento eliminado',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Departamento a salvo',
          'error'
        );
      }
    });
  }
}