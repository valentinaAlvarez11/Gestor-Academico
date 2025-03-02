import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './curso.entity';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { CursoRepository } from './curso.repository';
import { DataSource } from 'typeorm';
import { ProfesorModule } from '../profesor/profesor.module';

@Module({
    imports: [TypeOrmModule.forFeature([CursoEntity]), ProfesorModule],
    providers: [
      CursoService,
      {
        provide: CursoRepository,
        useFactory: (dataSource: DataSource) => new CursoRepository(dataSource),
        inject: [DataSource],
      },
    ],
    controllers: [CursoController],
    exports: [CursoService, CursoRepository, TypeOrmModule], // ✅ Agregar TypeOrmModule aquí
  })
  export class CursoModule {}
  
