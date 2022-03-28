import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListContractsUseCase } from './ListContractsUseCase';

export class ListContractsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listContractsUseCase = container.resolve(ListContractsUseCase);

    const contracts = await listContractsUseCase.execute();

    return response.json(contracts);
  }
}
