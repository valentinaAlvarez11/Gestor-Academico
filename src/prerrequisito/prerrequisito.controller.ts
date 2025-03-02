import { Controller, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PrerrequisitoService } from './prerrequisito.service';

@Controller('prerrequisitos')
export class PrerrequisitoController {
  constructor(private readonly prerrequisitoService: PrerrequisitoService) {}

  @Post()
  async create(@Body() body: { cursoActualId: number; cursoRequeridoId: number }) {
    return await this.prerrequisitoService.create(body.cursoActualId, body.cursoRequeridoId);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.prerrequisitoService.delete(id);
  }
}
