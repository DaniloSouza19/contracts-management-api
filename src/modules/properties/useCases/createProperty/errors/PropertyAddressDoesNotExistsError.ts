import { AppError } from '@shared/errors/AppError';

class PropertyAddressDoesNotExistsError extends AppError {
  constructor() {
    super('Property address does not exists');
  }
}

export { PropertyAddressDoesNotExistsError };
