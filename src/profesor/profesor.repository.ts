import { EntityRepository, Repository } from "typeorm";
import { ProfesorEntity } from "./profesor.entity";

@EntityRepository(ProfesorEntity)
export class ProfesorRepository extends Repository<ProfesorEntity> {}
