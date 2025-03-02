import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoEntity } from './curso.entity';
import { CursoRepository } from './curso.repository';
import { CursoDto } from './dto/curso.dto';
import { ProfesorService } from '../profesor/profesor.service';

@Injectable()
export class CursoService {
    
    constructor(
        @InjectRepository(CursoEntity)
        private cursoRepository: CursoRepository,
        private profesorService: ProfesorService
    ) { }

    async getAll(): Promise<CursoEntity[]> {
        const list = await this.cursoRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'No hay cursos registrados' });
        }
        return list;
    }

    async findById(id: number): Promise<CursoEntity> {
        const curso = await this.cursoRepository.findOne({ where: { id } });
        if (!curso) {
            throw new NotFoundException({ message: 'Curso no encontrado' });
        }
        return curso;
    }

    async create(dto: CursoDto): Promise<any> {
        const profesor = await this.profesorService.findById(dto.profesorId);
        if (!profesor) {
            throw new NotFoundException({ message: 'Profesor no encontrado' });
        }

        const curso = this.cursoRepository.create({
            codigo: dto.codigo,
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            profesor: profesor
        });

        await this.cursoRepository.save(curso);
        return { message: `Curso ${dto.nombre} creado exitosamente` };
    }

    async update(id: number, dto: CursoDto): Promise<any> {
        const curso = await this.findById(id);
        if (!curso) throw new BadRequestException({ message: 'Curso no encontrado' });

        curso.codigo = dto.codigo ?? curso.codigo;
        curso.nombre = dto.nombre ?? curso.nombre;
        curso.descripcion = dto.descripcion ?? curso.descripcion;

        await this.cursoRepository.save(curso);
        return { message: `Curso ${curso.nombre} actualizado` };
    }

    async delete(id: number): Promise<any> {
        const curso = await this.findById(id);
    
        if (!curso) {
            throw new NotFoundException('Curso no encontrado');
        }
    
        // Ahora eliminar el curso
        await this.cursoRepository.delete(id);
        
        return { message: `Curso ${curso.nombre} eliminado` };
    }
    
}
