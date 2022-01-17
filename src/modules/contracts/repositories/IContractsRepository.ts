import { ICreateContractDTO } from '../dtos/ICreateContractDTO';
import { Contract } from '../infra/entities/Contract';

interface IContractsRepository {
  create(data: ICreateContractDTO): Promise<Contract>;
  findById(id: string): Promise<Contract | undefined>;
}

export { IContractsRepository };
