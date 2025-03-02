import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {
    @IsNotBlank({ message: 'el nombre no puede estar vacío' })
    nombre: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10)
    precio?: number;
}
