import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';

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
    await this.contractsRepository.renew({
      contract_id,
      end_date,
      start_date,
      price,
    });
  }
}

export { RenewContractUseCase };
