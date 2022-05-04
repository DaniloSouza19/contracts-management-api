import { differenceInDays, isAfter, parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListContractsUseCase } from './ListContractsUseCase';

export class ListContractsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { onlyActive } = request.query;

    const listContractsUseCase = container.resolve(ListContractsUseCase);

    const contracts = await listContractsUseCase.execute({
      onlyActive: Boolean(onlyActive),
    });

    const contractsMapper = contracts.map((contract) => {
      return {
        ...contract,
        expiresInDays: differenceInDays(
          parseISO(contract.end_date.toISOString()),
          new Date()
        ),
        isActive: isAfter(contract.end_date, new Date()),
      };
    });

    return response.json(contractsMapper);
  }
}
