import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HorarioEntity } from './horario.entity';
import { Repository } from 'typeorm';
import { CursoEntity } from 'src/curso/curso.entity';
import { CreateHorarioDto } from './dto/horario.dto';
import { UpdateHorarioDto } from './dto/horario.dto';


@Injectable()
export class HorarioService {
    constructor(
        @InjectRepository(HorarioEntity)
        private readonly horarioRepository: Repository<HorarioEntity>,
      
        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>,
      ) {}
      

  async getAll(): Promise<HorarioEntity[]> {
    return await this.horarioRepository.find({ relations: ['curso'] });
  }

  async getOne(id: number): Promise<HorarioEntity> {
    const horario = await this.horarioRepository.findOne({
      where: { id },
      relations: ['curso'],
    });
    if (!horario) {
      throw new NotFoundException('Horario no encontrado.');
    }
    return horario;
  }
  

  async create(dto: CreateHorarioDto) {
    const { diaSemana, horaInicio, horaFin, cursoId } = dto;
    const cursoExists = await this.cursoRepository.exist({ where: { id: cursoId } });
  
    if (!cursoExists) {
      throw new NotFoundException(`Curso con ID ${cursoId} no encontrado`);
    }
    const horario = this.horarioRepository.create({
      diaSemana,
      horaInicio,
      horaFin,
      curso: { id: cursoId }
    });
  
    return await this.horarioRepository.save(horario);
  }
  

  async update(id: number, updateHorarioDto: UpdateHorarioDto): Promise<HorarioEntity> {
    const horario = await this.horarioRepository.findOne({ where: { id } });
  
    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }
  
    Object.assign(horario, updateHorarioDto);
    return this.horarioRepository.save(horario);
  }

  async delete(id: number): Promise<void> {
    const resultado = await this.horarioRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException('Horario no encontrado.');
    }
    console.log('Horario eliminado');
  }
  
}
