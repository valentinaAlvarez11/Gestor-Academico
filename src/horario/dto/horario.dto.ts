import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo',
}

export class CreateHorarioDto {
  @IsEnum(DiaSemana)
  @IsNotEmpty()
  diaSemana: DiaSemana;

  @IsString()
  @IsNotEmpty()
  horaInicio: string; // Formato HH:MM:SS

  @IsString()
  @IsNotEmpty()
  horaFin: string; // Formato HH:MM:SS

  @IsNumber()
  @IsNotEmpty()
  cursoId: number;
}

export class UpdateHorarioDto {
  @IsEnum(DiaSemana)
  diaSemana?: DiaSemana;

  @IsString()
  horaInicio?: string;

  @IsString()
  horaFin?: string;

  @IsNumber()
  cursoId?: number;
}
