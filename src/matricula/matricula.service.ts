import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatriculaEntity } from './matricula.entity';
import { MatriculaDto } from './dto/matricula.dto';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { CursoEntity } from '../curso/curso.entity';

@Injectable()
export class MatriculaService {
  constructor(
    @InjectRepository(MatriculaEntity)
    private matriculaRepository: Repository<MatriculaEntity>,
    @InjectRepository(EstudianteEntity)
    private estudianteRepository: Repository<EstudianteEntity>,
    @InjectRepository(CursoEntity)
    private cursoRepository: Repository<CursoEntity>,
  ) {}

  async getAll(): Promise<MatriculaEntity[]> {
    return await this.matriculaRepository.find({ relations: ['estudiante', 'curso'] });
  }

  async getOne(id: number): Promise<MatriculaEntity> {
    const matricula = await this.matriculaRepository.findOne({ where: { id }, relations: ['estudiante', 'curso'] });
    if (!matricula) {
      throw new NotFoundException('Matrícula no encontrada.');
    }
    return matricula;
  }

  async create(dto: MatriculaDto): Promise<MatriculaEntity> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id: dto.estudianteId } });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    const curso = await this.cursoRepository.findOne({ where: { id: dto.cursoId } });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado.');
    }

    const matricula = this.matriculaRepository.create({
      fechaInscripcion: dto.fechaInscripcion,
      calificacionFinal: dto.calificacionFinal,
      estudiante,
      curso,
    });

    return await this.matriculaRepository.save(matricula);
  }

  async update(id: number, dto: MatriculaDto): Promise<MatriculaEntity> {
    await this.getOne(id);
    await this.matriculaRepository.update(id, dto);
    return this.getOne(id);
  }

  async delete(id: number): Promise<any> {
    await this.getOne(id);
    await this.matriculaRepository.delete(id);
    return { message: 'Matrícula eliminada.' };
  }
}
