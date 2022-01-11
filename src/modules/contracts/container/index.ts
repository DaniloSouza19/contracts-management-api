import { container } from 'tsyringe';

import { ContractsRepository } from '../infra/repositories/ContractsRepository';
import { IContractsRepository } from '../repositories/IContractsRepository';

container.registerSingleton<IContractsRepository>(
  'ContractsRepository',
  ContractsRepository
);
