import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Rol } from '../usuario.entity';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(Rol, { message: 'Rol no válido' })
  rol: Rol;
}
