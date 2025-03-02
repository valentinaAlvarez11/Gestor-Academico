import { IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MatriculaDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fechaInscripcion: Date;

  @IsOptional()
  @IsNumber()
  calificacionFinal?: number;

  @IsNotEmpty()
  @IsNumber()
  estudianteId: number;

  @IsNotEmpty()
  @IsNumber()
  cursoId: number;
}
