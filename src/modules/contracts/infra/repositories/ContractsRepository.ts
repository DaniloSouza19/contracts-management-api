import { ICreateContractDTO } from '@modules/contracts/dtos/ICreateContractDTO';
import { IListContractsDTO } from '@modules/contracts/dtos/IListContractsDTO';
import { IRenewContractDTO } from '@modules/contracts/dtos/IRenewContractDTO';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';
import { getRepository, Repository, MoreThanOrEqual } from 'typeorm';

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

  async renew({
    contract_id,
    end_date,
    start_date,
    price,
  }: IRenewContractDTO): Promise<void> {
    const contract = await this.repository.findOne(contract_id);

    if (contract) {
      Object.assign(contract, {
        start_date,
        end_date,
        price,
      });

      await this.repository.save(contract);
    }
  }

  async list({ onlyActive }: IListContractsDTO): Promise<Contract[]> {
    if (onlyActive) {
      return this.repository.find({
        where: {
          end_date: MoreThanOrEqual(new Date()),
        },
        relations: ['customer', 'contractor', 'property'],
      });
    }

    return this.repository.find({
      relations: ['customer', 'contractor', 'property'],
    });
  }
}

export { ContractsRepository };
