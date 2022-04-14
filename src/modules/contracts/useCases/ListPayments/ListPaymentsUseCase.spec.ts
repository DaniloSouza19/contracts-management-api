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

    const payments = await listPaymentsUseCase.execute();

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

    const payments = await listPaymentsUseCase.execute('some-contract-id');

    expect(payments).toEqual(expect.arrayContaining([payment1, payment2]));
    expect(payments).toEqual(expect.not.arrayContaining([payment3]));
  });
});
