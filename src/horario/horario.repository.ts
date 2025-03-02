import { EntityRepository, Repository } from 'typeorm';
import { HorarioEntity } from './horario.entity';

@EntityRepository(HorarioEntity)
export class HorarioRepository extends Repository<HorarioEntity> {}
