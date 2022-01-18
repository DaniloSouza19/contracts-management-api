import { container } from 'tsyringe';

import { ContractsRepository } from '../infra/repositories/ContractsRepository';
import { PaymentsRepository } from '../infra/repositories/PaymentsRepository';
import { IContractsRepository } from '../repositories/IContractsRepository';
import { IPaymentsRepository } from '../repositories/IPaymentsRepository';

container.registerSingleton<IContractsRepository>(
  'ContractsRepository',
  ContractsRepository
);

container.registerSingleton<IPaymentsRepository>(
  'PaymentsRepository',
  PaymentsRepository
);
