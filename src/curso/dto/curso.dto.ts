import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CursoDto {
    @IsNotBlank({ message: 'El código no puede estar vacío' })
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsNotBlank({ message: 'El nombre no puede estar vacío' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNotEmpty({ message: 'El profesor es obligatorio' })
    profesorId: number;

    @IsOptional()
    @IsArray()
    prerrequisitosIds?: number[];
}
