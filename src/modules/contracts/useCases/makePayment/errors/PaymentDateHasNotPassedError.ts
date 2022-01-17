import { AppError } from '@shared/errors/AppError';

class PaymentDateHasNotPassedError extends AppError {
  constructor() {
    super('Payment date has not passed');
  }
}

export { PaymentDateHasNotPassedError };
