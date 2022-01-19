import { IPaymentsRepository } from '@modules/contracts/repositories/IPaymentsRepository';
import { isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { PaymentDateHasNotPassedError } from './errors/PaymentDateHasNotPassedError';

interface IRequest {
  payment_id: string;
  payment_date: Date;
}

@injectable()
class MakePaymentUseCase {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository
  ) {}

  async execute({ payment_id, payment_date }: IRequest): Promise<void> {
    const dateHasNotPassed = isAfter(payment_date, new Date());

    if (dateHasNotPassed) {
      throw new PaymentDateHasNotPassedError();
    }

    await this.paymentsRepository.toPay({
      payment_id,
      payment_date,
    });
  }
}

export { MakePaymentUseCase };
