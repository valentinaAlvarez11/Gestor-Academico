import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrerrequisitoRepository } from './prerrequisito.repository';
import { PrerrequisitoEntity } from './prerrequisito.entity';
import { CursoRepository } from '../curso/curso.repository';
import { CursoEntity } from 'src/curso/curso.entity';

@Injectable()
export class PrerrequisitoService {
  constructor(
    @InjectRepository(PrerrequisitoEntity)
    private prerrequisitoRepository: PrerrequisitoRepository,

    @InjectRepository(CursoEntity)
    private cursoRepository: CursoRepository,
  ) {}

  async create(cursoActualId: number, cursoRequeridoId: number): Promise<any> {
    const cursoActual = await this.cursoRepository.findOne({ where: { id: cursoActualId } });
    const cursoRequerido = await this.cursoRepository.findOne({ where: { id: cursoRequeridoId } });

    if (!cursoActual || !cursoRequerido) {
      throw new NotFoundException('Uno o ambos cursos no existen.');
    }

    const prerrequisito = this.prerrequisitoRepository.create({
      cursoActual,
      cursoRequerido,
    });

    await this.prerrequisitoRepository.save(prerrequisito);
    return { message: `El curso ${cursoActual.nombre} ahora requiere ${cursoRequerido.nombre}.` };
  }

  async delete(id: number): Promise<any> {
    const prerrequisito = await this.prerrequisitoRepository.findOneBy({ id });

    if (!prerrequisito) {
      throw new NotFoundException('El prerrequisito no existe.');
    }

    await this.prerrequisitoRepository.delete(id);
    return { message: 'Prerrequisito eliminado.' };
  }
}
