import { EntityRepository, Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';

@EntityRepository(EvaluacionEntity)
export class EvaluacionRepository extends Repository<EvaluacionEntity> {}
