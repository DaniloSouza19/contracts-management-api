import { Payment } from '@modules/contracts/infra/entities/Payment';
import { IPaymentsRepository } from '@modules/contracts/repositories/IPaymentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPaymentsUseCase {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository
  ) {}

  async execute(contract_id?: string): Promise<Payment[]> {
    const payments = await this.paymentsRepository.list(contract_id);

    return payments;
  }
}
