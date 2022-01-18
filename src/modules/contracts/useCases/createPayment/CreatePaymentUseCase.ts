import { Payment } from '@modules/contracts/infra/entities/Payment';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';
import { IPaymentsRepository } from '@modules/contracts/repositories/IPaymentsRepository';
import { isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { ContractAlreadyDueError } from './errors/ContractAlreadyDueError';
import { ContractDoesNotExistsError } from './errors/ContractDoesNotExistsError';

interface IRequest {
  description: string;
  contract_id: string;
  due_date: Date;
  payment_date?: Date;
  additional_fees?: number;
  discount?: number;
}

@injectable()
class CreatePaymentUseCase {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository
  ) {}

  async execute({
    description,
    additional_fees = 0,
    contract_id,
    discount = 0,
    due_date,
    payment_date,
  }: IRequest): Promise<Payment> {
    const contractExists = await this.contractsRepository.findById(contract_id);

    if (!contractExists) {
      throw new ContractDoesNotExistsError();
    }

    const contractIsAlreadyDue = isBefore(contractExists.end_date, new Date());

    if (contractIsAlreadyDue) {
      throw new ContractAlreadyDueError();
    }

    const payment = await this.paymentsRepository.create({
      description,
      additional_fees,
      contract_id,
      discount,
      due_date,
      is_paid: !!payment_date,
      value: contractExists.price,
      payment_date,
    });

    return payment;
  }
}

export { CreatePaymentUseCase };
