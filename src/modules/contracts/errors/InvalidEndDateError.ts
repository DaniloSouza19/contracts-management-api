import { AppError } from '@shared/errors/AppError';

class InvalidEndDateError extends AppError {
  constructor() {
    super('Invalid end Date');
  }
}

export { InvalidEndDateError };
