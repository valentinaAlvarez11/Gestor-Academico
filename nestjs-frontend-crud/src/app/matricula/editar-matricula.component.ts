import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatriculaService } from './../services/matricula.service';
import { Matricula } from './../models/matricula';

@Component({
  selector: 'app-editar-matricula',
  templateUrl: './editar-matricula.component.html',
  styleUrls: ['./editar-matricula.component.css']
})
export class EditarMatriculaComponent implements OnInit {
  matricula: Matricula = new Matricula(0, '', new Date(), undefined);
  estudianteId: number | null = null;
  cursoId: number | null = null;

  constructor(
    private matriculaService: MatriculaService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMatricula();
  }

  loadMatricula(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.matriculaService.detail(id).subscribe(
      data => {
        this.matricula = data;
        this.estudianteId = data.estudianteId;
        this.cursoId = data.cursoId;
      },
      err => {
        this.toastr.error('Error al cargar la matrícula', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/matriculas']);
      }
    );
  }

  onUpdate(): void {
    if (this.estudianteId === null || this.cursoId === null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    this.matricula.estudianteId = this.estudianteId;
    this.matricula.cursoId = this.cursoId;

    this.matriculaService.update(this.matricula.id!, this.matricula).subscribe(
      data => {
        this.toastr.success('Matrícula actualizada con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/matriculas']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/matriculas']);
  }
}
