import { AppError } from '@shared/errors/AppError';

class CustomerDoesNotFound extends AppError {
  constructor() {
    super('Customer does not found');
  }
}

export { CustomerDoesNotFound };
