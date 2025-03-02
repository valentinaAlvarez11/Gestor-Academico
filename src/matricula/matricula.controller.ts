import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaDto } from './dto/matricula.dto';

@Controller('matriculas')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @Get()
  async getAll() {
    return await this.matriculaService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.matriculaService.getOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
@Post(':estudianteId/:cursoId')
async createByParams(
  @Param('estudianteId', ParseIntPipe) estudianteId: number,
  @Param('cursoId', ParseIntPipe) cursoId: number
) {
  const dto = { estudianteId, cursoId, fechaInscripcion: new Date() };
  return this.matriculaService.create(dto);
}


  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: MatriculaDto) {
    return await this.matriculaService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.matriculaService.delete(id);
  }
}
