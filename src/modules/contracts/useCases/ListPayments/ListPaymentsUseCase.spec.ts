import { PaymentsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/PaymentsRepositoryInMemory';

import { ListPaymentsUseCase } from './ListPaymentsUseCase';

let listPaymentsUseCase: ListPaymentsUseCase;
let paymentsRepositoryInMemory: PaymentsRepositoryInMemory;

describe('List all Payments', () => {
  beforeEach(() => {
    paymentsRepositoryInMemory = new PaymentsRepositoryInMemory();

    listPaymentsUseCase = new ListPaymentsUseCase(paymentsRepositoryInMemory);
  });

  it('Should be able to list all Payments', async () => {
    // Input values
    const payment1 = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: 'some-contract-id',
      due_date: new Date(),
      value: 1200,
      payment_date: new Date(),
    });

    const payment2 = await paymentsRepositoryInMemory.create({
      description: 'Second Payment',
      contract_id: 'some-contract-id',
      due_date: new Date(),
      value: 1200,
      payment_date: new Date(),
    });

    const payments = await listPaymentsUseCase.execute({});

    expect(payments).toEqual(expect.arrayContaining([payment1, payment2]));
  });

  it('Should be able to list all Payments filtering by a contract', async () => {
    // Input values
    const payment1 = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: 'some-contract-id',
      due_date: new Date(),
      value: 1200,
      payment_date: new Date(),
    });

    const payment2 = await paymentsRepositoryInMemory.create({
      description: 'Second Payment',
      contract_id: 'some-contract-id',
      due_date: new Date(),
      value: 1200,
      payment_date: new Date(),
      additional_fees: 10,
    });

    const payment3 = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: 'other-contract-id',
      due_date: new Date(),
      value: 1500,
      payment_date: new Date(),
    });

    const payments = await listPaymentsUseCase.execute({
      contract_id: 'some-contract-id',
    });

    expect(payments).toEqual(expect.arrayContaining([payment1, payment2]));
    expect(payments).toEqual(expect.not.arrayContaining([payment3]));
  });

  it('Should be able to list all payments filtering by only pay', async () => {
    const payment1 = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: 'some-contract-id',
      due_date: new Date(),
      value: 1200,
    });

    const payment2 = await paymentsRepositoryInMemory.create({
      description: 'Second Payment',
      contract_id: 'some-contract-id',
      due_date: new Date(),
      value: 1200,
      payment_date: new Date(),
    });

    const payments = await listPaymentsUseCase.execute({
      only_pay: true,
    });

    expect(payments).toEqual(expect.not.arrayContaining([payment2]));
  });

  it('Should be able to list all payments filtering by due month', async () => {
    const paymentActualMonth = await paymentsRepositoryInMemory.create({
      description: 'First Payment',
      contract_id: 'some-contract-id',
      due_date: new Date('2022-01-01T00:00:00'),
      value: 1200,
    });

    const paymentNextMonth = await paymentsRepositoryInMemory.create({
      description: 'Second Payment',
      contract_id: 'some-contract-id',
      due_date: new Date('2022-02-01T00:00:00'),
      value: 1200,
      payment_date: new Date(),
    });

    const payments = await listPaymentsUseCase.execute({
      due_month: 1,
    });

    expect(payments).toEqual(expect.not.arrayContaining([paymentNextMonth]));
  });
});
