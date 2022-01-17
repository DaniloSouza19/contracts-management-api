import { ICreateContractDTO } from '@modules/contracts/dtos/ICreateContractDTO';
import { Contract } from '@modules/contracts/infra/entities/Contract';

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

  async findById(id: string): Promise<Contract | undefined> {
    const contract = this.contracts.find((contract) => contract.id === id);

    return contract;
  }
}

export { ContractsRepositoryInMemory };
