import { Controller, Post, Get, Put, Param, Delete, Body, ParseIntPipe } from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CreateCalificacionDto } from './dto/calificacion.dto';
import { UpdateCalificacionDto } from './dto/calificacion.dto';
import { CalificacionEntity } from './calificacion.entity';

@Controller('calificaciones')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post()
  create(@Body() dto: CreateCalificacionDto): Promise<CalificacionEntity> {
    return this.calificacionService.create(dto);
  }

  @Get()
  findAll(): Promise<CalificacionEntity[]> {
    return this.calificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CalificacionEntity> {
    return this.calificacionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCalificacionDto,
  ): Promise<CalificacionEntity> {
    return this.calificacionService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.calificacionService.delete(id);
  }
}
