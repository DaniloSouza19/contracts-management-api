import { ICreateContractDTO } from '../dtos/ICreateContractDTO';
import { Contract } from '../infra/Contract';

interface IContractsRepository {
  create(data: ICreateContractDTO): Promise<Contract>;
}

export { IContractsRepository };
