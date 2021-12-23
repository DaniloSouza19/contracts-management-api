import { AppError } from '@shared/errors/AppError';

class AddressNotFound extends AppError {
  constructor() {
    super('Address does not found');
  }
}

export { AddressNotFound };
