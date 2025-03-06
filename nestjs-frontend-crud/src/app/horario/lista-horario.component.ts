import { Component, OnInit } from '@angular/core';
import { HorarioService } from './../services/horario.service';
import { ToastrService } from 'ngx-toastr';
import { Horario } from './../models/horario';

@Component({
  selector: 'app-lista-horario',
  templateUrl: './lista-horario.component.html',
  styleUrls: ['./lista-horario.component.css']
})
export class ListaHorarioComponent implements OnInit {
  horarios: Horario[] = [];
  listaVacia: string = '';

  constructor(
    private horarioService: HorarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarHorarios();
  }

  cargarHorarios(): void {
    this.horarioService.lista().subscribe(
      data => {
        this.horarios = data;
        if (this.horarios.length === 0) {
          this.listaVacia = 'No hay horarios disponibles';
        }
      },
      err => {
        this.toastr.error('Error al cargar los horarios', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  editarHorario(id: number): void {
    // Logic to navigate to the edit page for the selected horario
  }

  eliminarHorario(id: number): void {
    this.horarioService.delete(id).subscribe(
      data => {
        this.toastr.success('Horario eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarHorarios();
      },
      err => {
        this.toastr.error('Error al eliminar el horario', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }
}
