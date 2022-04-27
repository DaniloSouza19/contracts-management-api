import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { addDays } from 'date-fns';

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

    const contracts = await listContractsUseCase.execute({ onlyActive: false });

    expect(contracts).toEqual(expect.arrayContaining([contract1, contract2]));
  });

  it('Should be able to list all only active Contracts', async () => {
    // Input values
    const inactiveContract = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      description: 'Rent contract example',
      customer_id: 'some-customer-id',
      property_id: 'some-property-id',
      price: 1200,
      start_date: addDays(new Date(), -2),
      end_date: addDays(new Date(), -1),
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const activeContract = await contractsRepositoryInMemory.create({
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

    const contracts = await listContractsUseCase.execute({ onlyActive: true });

    expect(contracts).toEqual(expect.arrayContaining([activeContract]));
    expect(contracts).toEqual(expect.not.arrayContaining([inactiveContract]));
  });
});
