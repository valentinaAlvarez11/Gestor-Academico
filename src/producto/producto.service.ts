import { ProductoEntity } from './producto.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from './dto/producto.dto';
import { ProductoRepository } from './producto.repository';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'la lista está vacia' });
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { id } });
        if (!producto) {
            throw new NotFoundException({ message: 'No existe' });
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { nombre } });
        if (!producto) {
            throw new NotFoundException({ message: 'No existe un producto con ese nombre' });
        }
        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        // Buscar si ya existe un producto con el mismo nombre SIN lanzar error
        const exists = await this.productoRepository.findOne({ where: { nombre: dto.nombre } });
    
        if (exists) {
            throw new BadRequestException({ message: 'Ese nombre ya existe' });
        }
    
        // Crear y guardar el nuevo producto
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        
        return { message: `Producto ${producto.nombre} creado exitosamente` };
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto)
            throw new BadRequestException({ message: 'Ese producto no existe' });
    
        const exists = await this.productoRepository.findOne({ where: { nombre: dto.nombre } });
    
        if (exists && exists.id !== id) {
            throw new BadRequestException({ message: 'Ese nombre ya existe' });
        }
    
        producto.nombre = dto.nombre ?? producto.nombre;
        producto.precio = dto.precio ?? producto.precio;
    
        await this.productoRepository.save(producto);
        return { message: `Producto ${producto.nombre} actualizado` };
    }
    

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return { Message: `producto ${producto.nombre} eliminado` };
    }
}