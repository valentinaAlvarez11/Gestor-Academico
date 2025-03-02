import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrerrequisitoService } from './prerrequisito.service';
import { PrerrequisitoController } from './prerrequisito.controller';
import { PrerrequisitoEntity } from './prerrequisito.entity';
import { CursoEntity } from '../curso/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrerrequisitoEntity, CursoEntity])],
  providers: [PrerrequisitoService],
  controllers: [PrerrequisitoController],
})
export class PrerrequisitoModule {}
