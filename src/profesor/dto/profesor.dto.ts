import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProfesorDto {
    @IsNotBlank({ message: 'El nombre no puede estar vacío' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsDate({ message: 'La fecha de contratación debe ser válida' })
    @Type(() => Date)  // Convierte la entrada en una fecha
    fechaContratacion: Date;

    @IsNotEmpty({ message: 'El departamento es obligatorio' })
    departamentoId: number;
}
