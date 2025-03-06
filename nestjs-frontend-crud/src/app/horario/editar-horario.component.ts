import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from './../services/horario.service';
import { Horario } from './../models/horario';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css']
})
export class EditarHorarioComponent implements OnInit {
  horario: Horario = new Horario(0, 'Lunes', '', '');

  constructor(
    private horarioService: HorarioService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadHorario();
  }

  loadHorario(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.horarioService.detail(id).subscribe(
      data => {
        this.horario = data;
      },
      err => {
        this.toastr.error('Error al cargar el horario', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/horarios']);
      }
    );
  }

  onUpdate(): void {
    this.horarioService.update(this.horario.id!, this.horario).subscribe(
      data => {
        this.toastr.success('Horario actualizado con éxito', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/horarios']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/horarios']);
  }
}
