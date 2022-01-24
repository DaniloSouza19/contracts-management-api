import { AppError } from '@shared/errors/AppError';

class ContractDoesNotExistsError extends AppError {
  constructor() {
    super('Contract does not exists');
  }
}

export { ContractDoesNotExistsError };
