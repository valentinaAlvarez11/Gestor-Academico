import { IsString, IsNotEmpty, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateEvaluacionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;  // ✅ Usa string, porque IsDateString valida fechas en formato ISO

  @IsInt()
  @IsNotEmpty()
  cursoId: number;
}

export class UpdateEvaluacionDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsInt()
  @IsOptional()
  cursoId?: number;
}
