import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class DepartamentoDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    nombre: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(1, 20)
    codigo: string;
  }
