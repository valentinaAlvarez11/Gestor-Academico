import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from './../services/horario.service';
import { Horario } from './../models/horario';

@Component({
  selector: 'app-detalle-horario',
  templateUrl: './detalle-horario.component.html',
  styleUrls: ['./detalle-horario.component.css']
})
export class DetalleHorarioComponent implements OnInit {
  horario: Horario | null = null;

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

  volver(): void {
    this.router.navigate(['/horarios']);
  }
}
