import { ICreateContractDTO } from '../dtos/ICreateContractDTO';
import { Contract } from '../infra/entities/Contract';

interface IContractsRepository {
  create(data: ICreateContractDTO): Promise<Contract>;
}

export { IContractsRepository };
