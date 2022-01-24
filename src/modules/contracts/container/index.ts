import { container } from 'tsyringe';

import { ContractsRenewHistoryRepository } from '../infra/repositories/ContractsRenewHistoryRepository';
import { ContractsRepository } from '../infra/repositories/ContractsRepository';
import { PaymentsRepository } from '../infra/repositories/PaymentsRepository';
import { IContractsRenewHistoryRepository } from '../repositories/IContractsRenewHistoryRepository';
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

container.registerSingleton<IContractsRenewHistoryRepository>(
  'ContractsRenewHistoryRepository',
  ContractsRenewHistoryRepository
);
