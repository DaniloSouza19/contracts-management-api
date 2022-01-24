import { ICreateContractRenewHistoryDTO } from '@modules/contracts/dtos/ICreateContractRenewHistoryDTO';

import { ContractRenewHistory } from '../infra/entities/ContractsRenewHistory';

interface IContractsRenewHistoryRepository {
  create(data: ICreateContractRenewHistoryDTO): Promise<ContractRenewHistory>;
}

export { IContractsRenewHistoryRepository };
