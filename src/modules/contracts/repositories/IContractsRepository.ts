import { ICreateContractDTO } from '../dtos/ICreateContractDTO';
import { IRenewContractDTO } from '../dtos/IRenewContractDTO';
import { Contract } from '../infra/entities/Contract';

interface IContractsRepository {
  create(data: ICreateContractDTO): Promise<Contract>;
  findById(id: string): Promise<Contract | undefined>;
  renew(data: IRenewContractDTO): Promise<void>;
  list(): Promise<Contract[]>;
}

export { IContractsRepository };
