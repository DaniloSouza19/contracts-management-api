import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';

import { ListContractsUseCase } from './ListContractsUseCase';

let listContractsUseCase: ListContractsUseCase;
let contractsRepositoryInMemory: ContractsRepositoryInMemory;

describe('List all Contracts', () => {
  beforeEach(() => {
    contractsRepositoryInMemory = new ContractsRepositoryInMemory();

    listContractsUseCase = new ListContractsUseCase(
      contractsRepositoryInMemory
    );
  });

  it('Should be able to list all Contracts', async () => {
    // Input values
    const contract1 = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      description: 'Rent contract example',
      customer_id: 'some-customer-id',
      property_id: 'some-property-id',
      price: 1200,
      start_date: new Date(),
      end_date: new Date(),
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const contract2 = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      description: 'Rent contract example 2',
      customer_id: 'some-customer-id',
      property_id: 'some-property-id',
      price: 1200,
      start_date: new Date(),
      end_date: new Date(),
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const contracts = await listContractsUseCase.execute();

    expect(contracts).toEqual(expect.arrayContaining([contract1, contract2]));
  });
});
