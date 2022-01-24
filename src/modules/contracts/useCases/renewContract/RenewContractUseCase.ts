import { ContractRenewHistory } from '@modules/contracts/infra/entities/ContractsRenewHistory';
import { IContractsRenewHistoryRepository } from '@modules/contracts/repositories/IContractsRenewHistoryRepository';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';

import { ContractDoesNotExistsError } from './errors/ContractDoesNotExistsError';

interface IRequest {
  contract_id: string;
  start_date: Date;
  end_date: Date;
  price: number;
}

class RenewContractUseCase {
  constructor(
    private contractsRepository: IContractsRepository,
    private contractsRenewHistoryRepository: IContractsRenewHistoryRepository
  ) {}

  async execute({
    contract_id,
    end_date,
    start_date,
    price,
  }: IRequest): Promise<ContractRenewHistory> {
    const contractExists = await this.contractsRepository.findById(contract_id);

    if (!contractExists) {
      throw new ContractDoesNotExistsError();
    }

    const old_price = contractExists.price;
    const old_start_date = contractExists.start_date;
    const old_end_date = contractExists.end_date;

    await this.contractsRepository.renew({
      contract_id,
      end_date,
      start_date,
      price,
    });

    const contractRenewHistory =
      await this.contractsRenewHistoryRepository.create({
        contract_id,
        new_price: price,
        old_price,
        new_start_date: start_date,
        new_end_date: end_date,
        old_start_date,
        old_end_date,
      });

    return contractRenewHistory;
  }
}

export { RenewContractUseCase };
