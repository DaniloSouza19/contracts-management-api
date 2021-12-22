import { AppError } from '@shared/errors/AppError';

class CreateUserError extends AppError {
  constructor() {
    super('E-mail already exists');
  }
}

export { CreateUserError };
