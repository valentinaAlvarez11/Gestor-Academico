import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CalificacionEntity } from './calificacion.entity';

@Injectable()
export class CalificacionRepository extends Repository<CalificacionEntity> {
  constructor(@InjectRepository(CalificacionEntity) private readonly repo: Repository<CalificacionEntity>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
