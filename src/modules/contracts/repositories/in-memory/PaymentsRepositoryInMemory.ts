import { ICreatePaymentDTO } from '@modules/contracts/dtos/ICreatePaymentDTO';
import { IToPayDTO } from '@modules/contracts/dtos/IToPayDTO';
import { Payment } from '@modules/contracts/infra/entities/Payment';

import { IPaymentsRepository } from '../IPaymentsRepository';

class PaymentsRepositoryInMemory implements IPaymentsRepository {
  private payments: Payment[] = [];

  async create({
    additional_fees,
    contract_id,
    description,
    discount,
    due_date,
    value,
    is_paid,
    payment_date,
  }: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();

    Object.assign(payment, {
      additional_fees,
      contract_id,
      description,
      value,
      discount,
      due_date,
      is_paid,
      payment_date,
    });

    this.payments.push(payment);

    return payment;
  }

  async toPay({ payment_id, payment_date }: IToPayDTO): Promise<void> {
    const payment = this.payments.find((payment) => payment.id === payment_id);

    if (payment) {
      payment.payment_date = payment_date;
      payment.is_paid = true;
    }
  }

  async findById(id: string): Promise<Payment | undefined> {
    return this.payments.find((payment) => payment.id === id);
  }

  async list(contract_id?: string): Promise<Payment[]> {
    const payments = this.payments.filter((payment) =>
      contract_id ? payment.contract_id === contract_id : payment
    );

    return payments;
  }
}

export { PaymentsRepositoryInMemory };
