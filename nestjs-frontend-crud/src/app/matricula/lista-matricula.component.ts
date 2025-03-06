import { Component, OnInit } from '@angular/core';
import { MatriculaService } from './../services/matricula.service';
import { ToastrService } from 'ngx-toastr';
import { Matricula } from './../models/matricula';

@Component({
  selector: 'app-lista-matricula',
  templateUrl: './lista-matricula.component.html',
  styleUrls: ['./lista-matricula.component.css']
})
export class ListaMatriculaComponent implements OnInit {
  matriculas: Matricula[] = [];

  constructor(
    private matriculaService: MatriculaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarMatriculas();
  }

  cargarMatriculas(): void {
    this.matriculaService.lista().subscribe(
      data => {
        this.matriculas = data;
      },
      err => {
        this.toastr.error('Error al cargar las matrículas', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  editarMatricula(id: number): void {
    // Logic to navigate to the edit page for the selected matricula
  }

  eliminarMatricula(id: number): void {
    this.matriculaService.delete(id).subscribe(
      data => {
        this.toastr.success('Matrícula eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarMatriculas();
      },
      err => {
        this.toastr.error('Error al eliminar la matrícula', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }
}
