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
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        is_paid: true,
        payment_date,
      })
      .where('id = :id', { id: payment_id })
      .execute();
  }

  async findById(id: string): Promise<Payment | undefined> {
    return this.repository.findOne(id);
  }

  async list(contract_id?: string): Promise<Payment[]> {
    if (!contract_id) {
      return this.repository.find({
        relations: ['contract'],
      });
    }

    return this.repository.find({
      where: {
        contract_id,
      },
    });
  }
}

export { PaymentsRepository };
