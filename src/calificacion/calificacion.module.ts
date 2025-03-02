import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalificacionEntity } from './calificacion.entity';
import { CalificacionRepository } from './callificacion.repository';
import { CalificacionService } from './calificacion.service';
import { CalificacionController } from './calificacion.controller';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalificacionEntity, EstudianteEntity, EvaluacionEntity])],
  controllers: [CalificacionController],
  providers: [CalificacionService, CalificacionRepository],
  exports: [CalificacionService],
})
export class CalificacionModule {}
