import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { addYears } from 'date-fns';

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
});
