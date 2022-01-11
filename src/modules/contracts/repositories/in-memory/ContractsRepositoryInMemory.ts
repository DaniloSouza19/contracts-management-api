import { ICreateContractDTO } from '@modules/contracts/dtos/ICreateContractDTO';
import { Contract } from '@modules/contracts/infra/Contract';

import { IContractsRepository } from '../IContractsRepository';

class ContractsRepositoryInMemory implements IContractsRepository {
  private contracts: Contract[] = [];

  async create({
    contractor_id,
    customer_id,
    property_id,
    description,
    end_date,
    price,
    registration_id,
    registry_office,
    start_date,
  }: ICreateContractDTO): Promise<Contract> {
    const contract = new Contract();

    Object.assign(contract, {
      contractor_id,
      customer_id,
      property_id,
      description,
      end_date,
      price,
      registration_id,
      registry_office,
      start_date,
    });

    this.contracts.push(contract);

    return contract;
  }
}

export { ContractsRepositoryInMemory };
