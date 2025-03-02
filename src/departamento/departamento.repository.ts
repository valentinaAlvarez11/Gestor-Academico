import { EntityRepository, Repository } from "typeorm";
import { DepartamentoEntity } from "./departamento.entity";

@EntityRepository(DepartamentoEntity)
export class DepartamentoRepository extends Repository<DepartamentoEntity> {}
