import { AppError } from '@shared/errors/AppError';

class ContractorDoesNotFound extends AppError {
  constructor() {
    super('Contractor does not found');
  }
}

export { ContractorDoesNotFound };
