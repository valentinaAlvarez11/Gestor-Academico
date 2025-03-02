import { EntityRepository, Repository } from 'typeorm';
import { PrerrequisitoEntity } from './prerrequisito.entity';

@EntityRepository(PrerrequisitoEntity)
export class PrerrequisitoRepository extends Repository<PrerrequisitoEntity> {}
