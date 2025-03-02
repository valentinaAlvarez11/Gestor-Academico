import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';
import { CreateEvaluacionDto } from './dto/evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Get()
  async getAll(): Promise<EvaluacionEntity[]> {
    return this.evaluacionService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<EvaluacionEntity> {
    return this.evaluacionService.getOne(id);
  }

  @Post()
async create(@Body() data: CreateEvaluacionDto): Promise<EvaluacionEntity> {
  return this.evaluacionService.create(data);
}

@Put(':id')
async update(
  @Param('id') id: number,
  @Body() updateEvaluacionDto: UpdateEvaluacionDto
): Promise<EvaluacionEntity> {
  return this.evaluacionService.update(id, updateEvaluacionDto);
}


  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.evaluacionService.delete(id);
  }
}
