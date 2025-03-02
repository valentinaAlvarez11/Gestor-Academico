import { Injectable, NotFoundException } from '@nestjs/common';
import { CalificacionRepository } from './callificacion.repository';
import { CalificacionEntity } from './calificacion.entity';
import { CreateCalificacionDto, UpdateCalificacionDto } from './dto/calificacion.dto';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CalificacionService {
  constructor(
    private readonly calificacionRepository: CalificacionRepository,
    @InjectRepository(EstudianteEntity) private readonly estudianteRepository: Repository<EstudianteEntity>,
    @InjectRepository(EvaluacionEntity) private readonly evaluacionRepository: Repository<EvaluacionEntity>,
  ) {}

  async create(dto: CreateCalificacionDto): Promise<CalificacionEntity> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id: dto.estudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado.');

    const evaluacion = await this.evaluacionRepository.findOne({ where: { id: dto.evaluacionId } });
    if (!evaluacion) throw new NotFoundException('Evaluación no encontrada.');

    const calificacion = this.calificacionRepository.create({ ...dto, estudiante, evaluacion });
    return this.calificacionRepository.save(calificacion);
  }

  async findAll(): Promise<CalificacionEntity[]> {
    return this.calificacionRepository.find({ relations: ['estudiante', 'evaluacion'] });
  }

  async findOne(id: number): Promise<CalificacionEntity> {
    const calificacion = await this.calificacionRepository.findOne({ where: { id }, relations: ['estudiante', 'evaluacion'] });
    if (!calificacion) throw new NotFoundException('Calificación no encontrada.');
    return calificacion;
  }

  async update(id: number, dto: UpdateCalificacionDto): Promise<CalificacionEntity> {
    const calificacion = await this.calificacionRepository.findOne({ where: { id } });
    if (!calificacion) throw new NotFoundException('Calificación no encontrada.');

    if (dto.nota !== undefined) calificacion.nota = dto.nota;

    return this.calificacionRepository.save(calificacion);
  }

  async delete(id: number): Promise<void> {
    const result = await this.calificacionRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Calificación no encontrada.');
  }
}
