import { AppError } from '@shared/errors/AppError';

class PersonDoesNotExistsError extends AppError {
  constructor() {
    super('Person does not exists');
  }
}

export { PersonDoesNotExistsError };
