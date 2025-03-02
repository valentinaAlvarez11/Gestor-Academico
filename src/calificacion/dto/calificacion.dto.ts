import { IsNumber, IsPositive, IsOptional } from 'class-validator';


export class CreateCalificacionDto {
  @IsNumber()
  @IsPositive()
  nota: number;

  @IsNumber()
  estudianteId: number;

  @IsNumber()
  evaluacionId: number;
}

export class UpdateCalificacionDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  nota?: number;
}
