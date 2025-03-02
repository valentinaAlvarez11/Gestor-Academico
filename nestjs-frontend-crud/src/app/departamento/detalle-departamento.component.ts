import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from './../models/departamento';
import { DepartamentoService } from './../services/departamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-departamento',
  templateUrl: './detalle-departamento.component.html',
  styleUrls: ['./detalle-departamento.component.css']
})
export class DetalleDepartamentoComponent implements OnInit {

  departamento: Departamento | null = null; // Se permite que sea null

  constructor(
    private departamentoService: DepartamentoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDepartamento();
  }

  cargarDepartamento(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.departamentoService.detail(id).subscribe(
      data => {
        this.departamento = data;
      },
      err => {
        this.toastr.error('Error al cargar el departamento', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      }
    );
  }
}
