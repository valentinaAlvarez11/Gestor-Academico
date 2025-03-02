import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from './departamento.entity';
import { Repository } from 'typeorm';
import { DepartamentoDto } from './dto/departamento.dto';

@Injectable()
export class DepartamentoService {
    constructor(
        @InjectRepository(DepartamentoEntity)
        private readonly departamentoRepository: Repository<DepartamentoEntity>,
    ) {}

    async getAll(): Promise<DepartamentoEntity[]> {
        const list = await this.departamentoRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de departamentos está vacía' });
        }
        return list;
    }

    async findById(id: number): Promise<DepartamentoEntity> {
        const departamento = await this.departamentoRepository.findOne({ where: { id } });
        if (!departamento) {
            throw new NotFoundException({ message: 'No existe el departamento' });
        }
        return departamento;
    }

    async findByNombre(nombre: string): Promise<DepartamentoEntity | null> {
        return await this.departamentoRepository.findOne({ where: { nombre } });
    }

    async findByCodigo(codigo: string): Promise<DepartamentoEntity | null> {
        return await this.departamentoRepository.findOne({ where: { codigo } });
    }

    async create(dto: DepartamentoDto): Promise<any> {
        const existsByName = await this.findByNombre(dto.nombre);
        if (existsByName) {
            throw new BadRequestException({ message: 'Ese nombre de departamento ya existe' });
        }

        const existsByCodigo = await this.findByCodigo(dto.codigo);
        if (existsByCodigo) {
            throw new BadRequestException({ message: 'Ese código de departamento ya existe' });
        }

        const departamento = this.departamentoRepository.create({
            nombre: dto.nombre,
            codigo: dto.codigo,
        });

        await this.departamentoRepository.save(departamento);
        return { message: `Departamento ${dto.nombre} creado exitosamente` };
    }

    async update(id: number, dto: DepartamentoDto): Promise<any> {
        const departamento = await this.findById(id);
        if (!departamento) {
            throw new BadRequestException({ message: 'Ese departamento no existe' });
        }

        const existsByName = await this.findByNombre(dto.nombre);
        if (existsByName && existsByName.id !== id) {
            throw new BadRequestException({ message: 'Ese nombre de departamento ya existe' });
        }

        const existsByCodigo = await this.findByCodigo(dto.codigo);
        if (existsByCodigo && existsByCodigo.id !== id) {
            throw new BadRequestException({ message: 'Ese código de departamento ya existe' });
        }

        departamento.nombre = dto.nombre ?? departamento.nombre;
        departamento.codigo = dto.codigo ?? departamento.codigo;

        await this.departamentoRepository.save(departamento);
        return { message: `Departamento ${departamento.nombre} actualizado` };
    }

    async delete(id: number): Promise<any> {
        const departamento = await this.findById(id);
        if (!departamento) {
            throw new NotFoundException({ message: 'El departamento no existe' });
        }
        await this.departamentoRepository.delete(id);
        return { message: `Departamento ${departamento.nombre} eliminado` };
    }
}
