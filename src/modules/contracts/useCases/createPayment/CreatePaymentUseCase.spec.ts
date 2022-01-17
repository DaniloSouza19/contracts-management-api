import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { PaymentsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/PaymentsRepositoryInMemory';
import { addDays, addYears } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { CreatePaymentUseCase } from './CreatePaymentUseCase';

let createPaymentUseCase: CreatePaymentUseCase;
let contractsRepositoryInMemory: ContractsRepositoryInMemory;
let paymentsRepositoryInMemory: PaymentsRepositoryInMemory;

describe('Create a new Payment', () => {
  beforeEach(() => {
    contractsRepositoryInMemory = new ContractsRepositoryInMemory();
    paymentsRepositoryInMemory = new PaymentsRepositoryInMemory();

    createPaymentUseCase = new CreatePaymentUseCase(
      paymentsRepositoryInMemory,
      contractsRepositoryInMemory
    );
  });

  it('Should be able to create a new payment', async () => {
    const contract = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      customer_id: 'some-customer-id',
      description: 'Some contract',
      start_date: new Date(),
      end_date: addYears(new Date(), 1),
      price: 1000,
      property_id: 'some-property-id',
      registration_id: '1234',
      registry_office: 'Some office',
    });

    const payment = await createPaymentUseCase.execute({
      description: 'First Payment',
      contract_id: contract.id,
      due_date: addDays(new Date(), 30),
    });

    expect(payment).toHaveProperty('id');
  });

  it('Should not be able to create a new payment with non-existing contract', async () => {
    await expect(async () => {
      await createPaymentUseCase.execute({
        description: 'First Payment',
        contract_id: 'non-existing-contract',
        due_date: addDays(new Date(), 30),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new payment with already due contract', async () => {
    const oneYearAgo = addYears(new Date(), -1);

    const yesterday = addDays(new Date(), -1);

    const contract = await contractsRepositoryInMemory.create({
      contractor_id: 'some-contractor-id',
      customer_id: 'some-customer-id',
      description: 'Some contract',
      start_date: oneYearAgo,
      end_date: yesterday,
      price: 1000,
      property_id: 'some-property-id',
      registration_id: '1234',
      registry_office: 'Some office',
    });

    await expect(async () => {
      await createPaymentUseCase.execute({
        description: 'First Payment',
        contract_id: contract.id,
        due_date: addDays(new Date(), 30),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
