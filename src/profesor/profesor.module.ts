import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { DepartamentoModule } from '../departamento/departamento.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProfesorEntity]), DepartamentoModule],
    providers: [ProfesorService],
    controllers: [ProfesorController],
    exports: [ProfesorService]
})
export class ProfesorModule {}

