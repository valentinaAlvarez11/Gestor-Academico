import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MatriculaEntity } from './matricula.entity';

@Injectable()
export class MatriculaRepository extends Repository<MatriculaEntity> {
  constructor(@InjectRepository(MatriculaEntity) private readonly repo: Repository<MatriculaEntity>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
