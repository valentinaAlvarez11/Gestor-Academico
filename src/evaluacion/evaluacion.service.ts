import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { Repository } from 'typeorm';
import { CreateEvaluacionDto } from './dto/evaluacion.dto';
import { CursoRepository } from 'src/curso/curso.repository';
import { CursoEntity } from 'src/curso/curso.entity';
import { UpdateEvaluacionDto } from './dto/evaluacion.dto';


@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepository: Repository<EvaluacionEntity>,
    @InjectRepository(CursoEntity) // 💡 Agregar el repositorio de Curso
    private readonly cursoRepository: Repository<CursoEntity>,
  ) {}

  async getAll(): Promise<EvaluacionEntity[]> {
    return await this.evaluacionRepository.find({ relations: ['curso', 'calificaciones'] });
  }

  async getOne(id: number): Promise<EvaluacionEntity> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { id },
      relations: ['curso', 'calificaciones'],
    });

    if (!evaluacion) {
      throw new NotFoundException('Evaluación no encontrada.');
    }
    return evaluacion;
  }

  async create(createEvaluacionDto: CreateEvaluacionDto): Promise<EvaluacionEntity> {
    const { nombre, fecha, cursoId } = createEvaluacionDto;

    const curso = await this.cursoRepository.findOne({ where: { id: cursoId } });
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }

    const nuevaEvaluacion = this.evaluacionRepository.create({ nombre, fecha, curso });
    return this.evaluacionRepository.save(nuevaEvaluacion);
  }

  async update(id: number, updateEvaluacionDto: UpdateEvaluacionDto): Promise<EvaluacionEntity> {
    const evaluacion = await this.getOne(id); // Verifica que la evaluación existe

    if (updateEvaluacionDto.cursoId) {
      const curso = await this.cursoRepository.findOne({ where: { id: updateEvaluacionDto.cursoId } });
      if (!curso) {
        throw new NotFoundException('Curso no encontrado');
      }
      evaluacion.curso = curso;
    }

    Object.assign(evaluacion, updateEvaluacionDto);
    return this.evaluacionRepository.save(evaluacion);
  }


  async delete(id: number): Promise<void> {
    const result = await this.evaluacionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Evaluación no encontrada.');
    }
  }
}
