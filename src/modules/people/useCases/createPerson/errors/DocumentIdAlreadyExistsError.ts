import { AppError } from '@shared/errors/AppError';

class DocumentIdAlreadyExistsError extends AppError {
  constructor() {
    super('Document id already exists');
  }
}

export { DocumentIdAlreadyExistsError };
