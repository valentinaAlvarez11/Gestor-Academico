import { Controller, Get, Param, Post, Put, Delete, Body, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './dto/profesor.dto';

@Controller('profesores')
export class ProfesorController {

    constructor(private readonly profesorService: ProfesorService) {}

    @Get()
    async getAll() {
        return await this.profesorService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.profesorService.findById(id);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create(@Body() dto: ProfesorDto) {
        return await this.profesorService.create(dto);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProfesorDto) {
        return await this.profesorService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.profesorService.delete(id);
    }
}
