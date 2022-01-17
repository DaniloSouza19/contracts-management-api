import { AppError } from '@shared/errors/AppError';

class ContractAlreadyDueError extends AppError {
  constructor() {
    super('Contract already due');
  }
}

export { ContractAlreadyDueError };
