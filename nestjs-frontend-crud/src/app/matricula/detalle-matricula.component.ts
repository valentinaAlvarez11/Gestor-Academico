import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatriculaService } from './../services/matricula.service';
import { Matricula } from './../models/matricula';

@Component({
  selector: 'app-detalle-matricula',
  templateUrl: './detalle-matricula.component.html',
  styleUrls: ['./detalle-matricula.component.css']
})
export class DetalleMatriculaComponent implements OnInit {
  matricula: Matricula | null = null;

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
      },
      err => {
        this.toastr.error('Error al cargar la matrícula', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/matriculas']);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/matriculas']);
  }
}
