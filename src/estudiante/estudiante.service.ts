import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteDto } from './dto/estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async getAll(): Promise<EstudianteEntity[]> {
    return await this.estudianteRepository.find({ relations: ['matriculas'] });
  }

  async getOne(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id }, relations: ['matriculas'] });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado.');
    }
    return estudiante;
  }
  

  async create(dto: EstudianteDto): Promise<EstudianteEntity> {
    const estudiante = this.estudianteRepository.create(dto);
    return await this.estudianteRepository.save(estudiante);
  }

  async update(id: number, dto: EstudianteDto): Promise<EstudianteEntity> {
    await this.getOne(id);
    await this.estudianteRepository.update(id, dto);
    return this.getOne(id);
  }

  async delete(id: number): Promise<any> {
    await this.getOne(id);
    await this.estudianteRepository.delete(id);
    return { message: 'Estudiante eliminado.' };
  }
}
