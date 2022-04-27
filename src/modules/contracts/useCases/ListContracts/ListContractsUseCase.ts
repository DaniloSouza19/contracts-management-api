import { Contract } from '@modules/contracts/infra/entities/Contract';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  onlyActive: boolean;
}

@injectable()
export class ListContractsUseCase {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository
  ) {}

  async execute({ onlyActive }: IRequest): Promise<Contract[]> {
    const contracts = await this.contractsRepository.list({ onlyActive });

    return contracts;
  }
}
