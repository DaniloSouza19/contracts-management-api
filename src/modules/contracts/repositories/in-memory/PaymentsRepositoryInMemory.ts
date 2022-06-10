import { ICreatePaymentDTO } from '@modules/contracts/dtos/ICreatePaymentDTO';
import { IListPaymentsDTO } from '@modules/contracts/dtos/IListPaymentsDTO';
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

  async list({
    contract_id,
    only_pay,
    due_month,
    due_year,
  }: IListPaymentsDTO): Promise<Payment[]> {
    const payments = this.payments.filter((payment) =>
      contract_id ? payment.contract_id === contract_id : payment
    );

    if (only_pay) {
      return payments.filter((payment) => payment.is_paid);
    }

    if (due_month) {
      return payments.filter(
        (payment) => payment.due_date.getMonth() === due_month - 1
      );
    }

    if (due_year) {
      return payments.filter(
        (payment) => payment.due_date.getFullYear() === due_year
      );
    }

    return payments;
  }
}

export { PaymentsRepositoryInMemory };
