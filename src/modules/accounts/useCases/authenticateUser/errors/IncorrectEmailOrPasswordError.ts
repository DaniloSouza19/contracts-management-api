import { AppError } from '@shared/errors/AppError';

class IncorrectEmailOrPasswordError extends AppError {
  constructor() {
    super('E-mail or password does not match', 401);
  }
}

export { IncorrectEmailOrPasswordError };
