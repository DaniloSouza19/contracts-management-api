import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { PaymentsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/PaymentsRepositoryInMemory';
import { addDays, addYears } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { MakePaymentUseCase } from './MakePaymentUseCase';

let makePaymentUseCase: MakePaymentUseCase;
let contractsRepositoryInMemory: ContractsRepositoryInMemory;
let paymentsRepositoryInMemory: PaymentsRepositoryInMemory;

describe('Make a Payment', () => {
  beforeEach(() => {
    contractsRepositoryInMemory = new ContractsRepositoryInMemory();
    paymentsRepositoryInMemory = new PaymentsRepositoryInMemory();

    makePaymentUseCase = new MakePaymentUseCase(paymentsRepositoryInMemory);
  });

  it('Should be able to make a payment', async () => {
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

    const { id: payment_id } = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: contract.id,
      due_date: addDays(new Date(), 30),
      value: contract.price,
    });

    const payment_date = new Date();

    await makePaymentUseCase.execute({
      payment_id,
      payment_date,
    });

    const payment = await paymentsRepositoryInMemory.findById(payment_id);

    expect(payment?.is_paid).toBe(true);
    expect(payment?.payment_date).toBe(payment_date);
  });

  it('Should not be able to make a payment with a payment date that has not passed', async () => {
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

    const { id: payment_id } = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: contract.id,
      due_date: addDays(new Date(), 30),
      value: contract.price,
    });

    const tomorrowsDate = addDays(new Date(), 1);

    await expect(async () => {
      await makePaymentUseCase.execute({
        payment_id,
        payment_date: tomorrowsDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
