import { ICreatePaymentDTO } from '@modules/contracts/dtos/ICreatePaymentDTO';
import { IToPayDTO } from '@modules/contracts/dtos/IToPayDTO';
import { IPaymentsRepository } from '@modules/contracts/repositories/IPaymentsRepository';
import { getRepository, Repository } from 'typeorm';

import { Payment } from '../entities/Payment';

class PaymentsRepository implements IPaymentsRepository {
  private repository: Repository<Payment>;

  constructor() {
    this.repository = getRepository(Payment);
  }
  async create({
    contract_id,
    description,
    due_date,
    value,
    additional_fees,
    discount,
    is_paid,
    payment_date,
  }: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.repository.create({
      contract_id,
      description,
      due_date,
      value,
      additional_fees,
      discount,
      is_paid,
      payment_date,
    });

    await this.repository.save(payment);

    return payment;
  }

  async toPay({ payment_date, payment_id }: IToPayDTO): Promise<void> {
    const payment = await this.repository.findOne(payment_id);

    if (payment) {
      payment.payment_date = payment_date;
      payment.is_paid = true;
      await this.repository.save(payment);
    }
  }

  async findById(id: string): Promise<Payment | undefined> {
    return this.repository.findOne(id);
  }
}

export { PaymentsRepository };
