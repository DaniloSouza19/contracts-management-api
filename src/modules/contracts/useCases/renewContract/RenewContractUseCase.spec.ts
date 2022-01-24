import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { addYears } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { RenewContractUseCase } from './RenewContractUseCase';

let renewContractUseCase: RenewContractUseCase;
let contractsRepositoryInMemory: ContractsRepositoryInMemory;

describe('Renew a contract', () => {
  beforeEach(() => {
    contractsRepositoryInMemory = new ContractsRepositoryInMemory();
    renewContractUseCase = new RenewContractUseCase(
      contractsRepositoryInMemory
    );
  });

  it('Should not be able to renew a contract with a non-existing contract', async () => {
    const newStartDate = new Date();
    const newEndDate = addYears(new Date(), 1);
    const newPrice = 1200;

    await expect(async () => {
      await renewContractUseCase.execute({
        contract_id: 'non-existing-contract',
        start_date: newStartDate,
        end_date: newEndDate,
        price: newPrice,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
