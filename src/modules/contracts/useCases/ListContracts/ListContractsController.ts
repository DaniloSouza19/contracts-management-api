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

    return response.json(contracts);
  }
}
