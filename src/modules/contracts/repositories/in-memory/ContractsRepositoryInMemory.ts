import { ICreateContractDTO } from '@modules/contracts/dtos/ICreateContractDTO';
import { IRenewContractDTO } from '@modules/contracts/dtos/IRenewContractDTO';
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

  async renew({
    contract_id,
    end_date,
    start_date,
    price,
  }: IRenewContractDTO): Promise<void> {
    const contractIndex = this.contracts.findIndex(
      (contract) => contract.id === contract_id
    );

    if (contractIndex !== -1) {
      this.contracts[contractIndex].start_date = start_date;
      this.contracts[contractIndex].end_date = end_date;
      this.contracts[contractIndex].price = price;
    }
  }
}

export { ContractsRepositoryInMemory };
