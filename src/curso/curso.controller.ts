import { Controller, Get, Param, Post, Put, Delete, Body, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoDto } from './dto/curso.dto';

@Controller('cursos')
export class CursoController {

    constructor(private readonly cursoService: CursoService) {}

    @Get()
    async getAll() {
        return await this.cursoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.cursoService.findById(id);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create(@Body() dto: CursoDto) {
        return await this.cursoService.create(dto);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CursoDto) {
        return await this.cursoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.cursoService.delete(id);
    }
}
