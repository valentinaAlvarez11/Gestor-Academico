import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { MatriculaEntity } from './matricula.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { CursoEntity } from '../curso/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatriculaEntity, EstudianteEntity, CursoEntity])],
  providers: [MatriculaService],
  controllers: [MatriculaController],
})
export class MatriculaModule {}
