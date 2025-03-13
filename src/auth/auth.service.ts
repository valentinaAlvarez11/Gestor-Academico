import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity, Rol } from './usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<{ message: string }> {
    const userExists = await this.usuarioRepository.findOne({ where: { email: dto.email } });
    if (userExists) throw new ConflictException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const usuario = this.usuarioRepository.create({
      email: dto.email,
      password: hashedPassword,
      rol: dto.rol,
    });

    await this.usuarioRepository.save(usuario);
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });

    if (!usuario || !(await bcrypt.compare(dto.password, usuario.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
