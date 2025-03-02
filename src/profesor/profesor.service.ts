import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorRepository } from './profesor.repository';
import { ProfesorDto } from './dto/profesor.dto';
import { DepartamentoService } from '../departamento/departamento.service';

@Injectable()
export class ProfesorService {
    
    constructor(
        @InjectRepository(ProfesorEntity)
        private profesorRepository: ProfesorRepository,
        private departamentoService: DepartamentoService
    ) { }

    async getAll(): Promise<ProfesorEntity[]> {
        const list = await this.profesorRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'No hay profesores registrados' });
        }
        return list;
    }

    async findById(id: number): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({ where: { id } });
        if (!profesor) {
            throw new NotFoundException({ message: 'Profesor no encontrado' });
        }
        return profesor;
    }

    async create(dto: ProfesorDto): Promise<any> {
        const departamento = await this.departamentoService.findById(dto.departamentoId);
        if (!departamento) {
            throw new NotFoundException({ message: 'Departamento no encontrado' });
        }
        const profesor = this.profesorRepository.create({
            nombre: dto.nombre,
            fechaContratacion: dto.fechaContratacion,
            departamento: departamento
        });
        await this.profesorRepository.save(profesor);
        return { message: `Profesor ${dto.nombre} creado exitosamente` };
    }

    async update(id: number, dto: ProfesorDto): Promise<any> {
        const profesor = await this.findById(id);
        const departamento = await this.departamentoService.findById(dto.departamentoId);

        if (!profesor) throw new BadRequestException({ message: 'Profesor no encontrado' });

        profesor.nombre = dto.nombre ?? profesor.nombre;
        profesor.fechaContratacion = dto.fechaContratacion ?? profesor.fechaContratacion;
        profesor.departamento = departamento ?? profesor.departamento;

        await this.profesorRepository.save(profesor);
        return { message: `Profesor ${profesor.nombre} actualizado` };
    }

    async delete(id: number): Promise<any> {
        const profesor = await this.findById(id);
    
        if (!profesor) {
            throw new NotFoundException('Profesor no encontrado');
        }
    
        // Ahora eliminar el profesor
        await this.profesorRepository.delete(id);
        
        return { message: `Profesor ${profesor.nombre} eliminado` };
    }
}
