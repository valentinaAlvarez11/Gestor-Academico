import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioEntity } from './horario.entity';
import { CreateHorarioDto } from './dto/horario.dto';
import { UpdateHorarioDto } from './dto/horario.dto';

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get()
  getAll(): Promise<HorarioEntity[]> {
    return this.horarioService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<HorarioEntity> {
    return this.horarioService.getOne(id);
  }

  @Post()
  create(@Body() data: CreateHorarioDto): Promise<HorarioEntity> {
    return this.horarioService.create(data);
  }
  

  @Put(':id')
async update(
  @Param('id') id: number,
  @Body() updateHorarioDto: UpdateHorarioDto,
): Promise<HorarioEntity> {
  return this.horarioService.update(id, updateHorarioDto);
}

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.horarioService.delete(id);
  }
}
