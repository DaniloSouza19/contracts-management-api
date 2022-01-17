import { ICreateContractDTO } from '@modules/contracts/dtos/ICreateContractDTO';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';
import { getRepository, Repository } from 'typeorm';

import { Contract } from '../entities/Contract';

class ContractsRepository implements IContractsRepository {
  private repository: Repository<Contract>;

  constructor() {
    this.repository = getRepository(Contract);
  }

  async create({
    contractor_id,
    customer_id,
    description,
    end_date,
    price,
    property_id,
    registration_id,
    registry_office,
    start_date,
  }: ICreateContractDTO): Promise<Contract> {
    const contract = this.repository.create({
      contractor_id,
      customer_id,
      description,
      end_date,
      price,
      property_id,
      registration_id,
      registry_office,
      start_date,
    });

    this.repository.save(contract);

    return contract;
  }

  async findById(id: string): Promise<Contract | undefined> {
    return this.repository.findOne(id);
  }
}

export { ContractsRepository };
