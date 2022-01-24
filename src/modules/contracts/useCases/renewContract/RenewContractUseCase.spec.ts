import { ContractsRenewHistoryRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRenewHistoryRepositoryInMemory';
import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { addYears } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { RenewContractUseCase } from './RenewContractUseCase';

let renewContractUseCase: RenewContractUseCase;
let contractsRepositoryInMemory: ContractsRepositoryInMemory;
let contractsRenewHistoryRepository: ContractsRenewHistoryRepositoryInMemory;

describe('Renew a contract', () => {
  beforeEach(() => {
    contractsRepositoryInMemory = new ContractsRepositoryInMemory();
    contractsRenewHistoryRepository =
      new ContractsRenewHistoryRepositoryInMemory();

    renewContractUseCase = new RenewContractUseCase(
      contractsRepositoryInMemory,
      contractsRenewHistoryRepository
    );
  });

  it('Should be able to renew a contract', async () => {
    const oldStartDate = addYears(new Date(), -1);
    const oldEndDate = addYears(new Date(), -2);

    const contract = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      customer_id: 'some-customer-id',
      description: 'Some rent contract',
      start_date: oldStartDate,
      end_date: oldEndDate,
      price: 1000,
      property_id: 'some-property-id',
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const newStartDate = new Date();
    const newEndDate = addYears(new Date(), 1);
    const newPrice = 1200;

    await renewContractUseCase.execute({
      contract_id: contract.id,
      start_date: newStartDate,
      end_date: newEndDate,
      price: newPrice,
    });

    const contractRenewed = await contractsRepositoryInMemory.findById(
      contract.id
    );

    expect(contractRenewed?.start_date).toBe(newStartDate);
    expect(contractRenewed?.end_date).toBe(newEndDate);
    expect(contractRenewed?.price).toBe(newPrice);
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

  it('Should be able to create a Contract Renew History after renewed it', async () => {
    const oldStartDate = addYears(new Date(), -1);
    const oldEndDate = new Date();
    const oldPrice = 1000;

    const contract = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      customer_id: 'some-customer-id',
      description: 'Some rent contract',
      start_date: oldStartDate,
      end_date: oldEndDate,
      price: oldPrice,
      property_id: 'some-property-id',
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const newStartDate = new Date();
    const newEndDate = addYears(new Date(), 1);
    const newPrice = 1200;

    const contractRenewHistory = await renewContractUseCase.execute({
      contract_id: contract.id,
      start_date: newStartDate,
      end_date: newEndDate,
      price: newPrice,
    });

    expect(contractRenewHistory).toHaveProperty('id');
    expect(contractRenewHistory?.new_start_date).toBe(newStartDate);
    expect(contractRenewHistory?.new_end_date).toBe(newEndDate);
    expect(contractRenewHistory?.new_price).toBe(newPrice);
    expect(contractRenewHistory?.old_start_date).toBe(oldStartDate);
    expect(contractRenewHistory?.old_end_date).toBe(oldEndDate);
    expect(contractRenewHistory?.old_price).toBe(oldPrice);
  });
});
