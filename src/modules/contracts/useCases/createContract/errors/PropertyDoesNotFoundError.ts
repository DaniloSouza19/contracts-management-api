import { AppError } from '@shared/errors/AppError';

class PropertyDoesNotFoundError extends AppError {
  constructor() {
    super('Property does not found');
  }
}

export { PropertyDoesNotFoundError };
