import { EntityRepository, Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';

@EntityRepository(EstudianteEntity)
export class EstudianteRepository extends Repository<EstudianteEntity> {}
