import { ICreateContractRenewHistoryDTO } from '@modules/contracts/dtos/ICreateContractRenewHistoryDTO';
import { ContractRenewHistory } from '@modules/contracts/infra/entities/ContractsRenewHistory';

import { IContractsRenewHistoryRepository } from '../IContractsRenewHistoryRepository';

class ContractsRenewHistoryInMemory
  implements IContractsRenewHistoryRepository
{
  private contractsRenewHistory: ContractRenewHistory[];

  async create({
    contract_id,
    id,
    new_end_date,
    new_price,
    new_start_date,
    old_end_date,
    old_price,
    old_start_date,
  }: ICreateContractRenewHistoryDTO): Promise<ContractRenewHistory> {
    const contractRenewHistory = new ContractRenewHistory();

    Object.assign(contractRenewHistory, {
      contract_id,
      id,
      new_end_date,
      new_price,
      new_start_date,
      old_end_date,
      old_price,
      old_start_date,
    });

    this.contractsRenewHistory.push(contractRenewHistory);

    return contractRenewHistory;
  }
}

export { ContractsRenewHistoryInMemory };
