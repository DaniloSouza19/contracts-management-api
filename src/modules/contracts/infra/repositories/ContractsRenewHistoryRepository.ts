import { ICreateContractRenewHistoryDTO } from '@modules/contracts/dtos/ICreateContractRenewHistoryDTO';
import { IContractsRenewHistoryRepository } from '@modules/contracts/repositories/IContractsRenewHistoryRepository';
import { getRepository, Repository } from 'typeorm';

import { ContractRenewHistory } from '../entities/ContractsRenewHistory';

class ContractsRenewHistoryRepository
  implements IContractsRenewHistoryRepository
{
  private repository: Repository<ContractRenewHistory>;

  constructor() {
    this.repository = getRepository(ContractRenewHistory);
  }

  async create({
    contract_id,
    new_end_date,
    new_price,
    new_start_date,
    old_end_date,
    old_price,
    old_start_date,
  }: ICreateContractRenewHistoryDTO): Promise<ContractRenewHistory> {
    const contractRenewHistory = this.repository.create({
      contract_id,
      new_end_date,
      new_price,
      new_start_date,
      old_end_date,
      old_price,
      old_start_date,
    });

    await this.repository.save(contractRenewHistory);

    return contractRenewHistory;
  }
}

export { ContractsRenewHistoryRepository };
