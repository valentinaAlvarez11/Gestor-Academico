import { Departamento } from './../models/departamento';
import { DepartamentoService } from './../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-departamento',
  templateUrl: './nuevo-departamento.component.html',
  styleUrls: ['./nuevo-departamento.component.css']
})
export class NuevoDepartamentoComponent implements OnInit {

  nombre = '';
  codigo = '';

  constructor(
    private departamentoService: DepartamentoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    if (!this.nombre || !this.codigo) {
      this.toastr.error('Todos los campos son obligatorios', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    
    const departamento = new Departamento(this.nombre, this.codigo);
    this.departamentoService.save(departamento).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/departamento']); // Redirigir a la lista de departamentos
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/departamento']); // Redirigir a la lista de departamentos
  }
}
