import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';

import { ContractDoesNotExistsError } from './errors/ContractDoesNotExistsError';

interface IRequest {
  contract_id: string;
  start_date: Date;
  end_date: Date;
  price: number;
}

class RenewContractUseCase {
  constructor(private contractsRepository: IContractsRepository) {}

  async execute({
    contract_id,
    end_date,
    start_date,
    price,
  }: IRequest): Promise<void> {
    const contractExists = await this.contractsRepository.findById(contract_id);

    if (!contractExists) {
      throw new ContractDoesNotExistsError();
    }

    await this.contractsRepository.renew({
      contract_id,
      end_date,
      start_date,
      price,
    });
  }
}

export { RenewContractUseCase };
