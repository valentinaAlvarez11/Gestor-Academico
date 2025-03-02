import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';

@Injectable()
export class CursoRepository extends Repository<CursoEntity> {
  constructor(private dataSource: DataSource) {
    super(CursoEntity, dataSource.createEntityManager());
  }
}
