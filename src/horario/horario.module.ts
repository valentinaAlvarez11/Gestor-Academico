import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioEntity } from './horario.entity';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { CursoModule } from 'src/curso/curso.module'; // Importar CursoModule
import { CursoEntity } from 'src/curso/curso.entity'; // Importar CursoEntity

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioEntity]), 
    CursoModule // Agregar CursoModule aquí
  ],
  controllers: [HorarioController],
  providers: [HorarioService],
  exports: [HorarioService],
})
export class HorarioModule {}
