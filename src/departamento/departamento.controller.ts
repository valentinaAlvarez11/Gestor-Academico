import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { Get, Param, ParseIntPipe, Post, Put, Body, Delete } from '@nestjs/common';
import { DepartamentoDto } from './dto/departamento.dto';

@Controller('departamentos')
export class DepartamentoController {
    constructor(private readonly departamentoService: DepartamentoService) {}

    @Get()
    async getAll() {
        return await this.departamentoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.departamentoService.findById(id);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create(@Body() dto: DepartamentoDto) {
        return await this.departamentoService.create(dto);
    }
    
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: DepartamentoDto) {
        return await this.departamentoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.departamentoService.delete(id);
    }
}
