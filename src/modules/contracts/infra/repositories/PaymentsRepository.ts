import { ICreatePaymentDTO } from '@modules/contracts/dtos/ICreatePaymentDTO';
import { IListPaymentsDTO } from '@modules/contracts/dtos/IListPaymentsDTO';
import { IToPayDTO } from '@modules/contracts/dtos/IToPayDTO';
import { IPaymentsRepository } from '@modules/contracts/repositories/IPaymentsRepository';
import { lastDayOfMonth, addHours } from 'date-fns';
import { Between, FindConditions, getRepository, Repository } from 'typeorm';

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

  async list({
    contract_id,
    only_pay,
    due_month,
    due_year,
  }: IListPaymentsDTO): Promise<Payment[]> {
    const where: FindConditions<Payment> = {};

    if (contract_id) {
      where.contract_id = contract_id;
    }

    if (only_pay) {
      where.is_paid = !!only_pay;
    }

    if (due_month && due_year) {
      const startMonth = new Date(due_year, due_month - 1, 1);

      const endMonth = addHours(lastDayOfMonth(startMonth), 3);

      where.due_date = Between(startMonth, endMonth);
    }

    return this.repository.find({
      where,
      relations: ['contract'],
    });
  }
}

export { PaymentsRepository };
