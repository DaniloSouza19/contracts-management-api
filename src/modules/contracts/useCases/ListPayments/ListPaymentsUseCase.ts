import { Payment } from '@modules/contracts/infra/entities/Payment';
import { IPaymentsRepository } from '@modules/contracts/repositories/IPaymentsRepository';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  only_pay?: boolean;
  contract_id?: string;
};

@injectable()
export class ListPaymentsUseCase {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository
  ) {}

  async execute({ only_pay, contract_id }: IRequest): Promise<Payment[]> {
    const payments = await this.paymentsRepository.list({
      contract_id,
      only_pay,
    });

    return payments;
  }
}
