import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPropertiesUseCase } from './ListPropertiesUseCase';

export class ListPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPropertiesUseCase = container.resolve(ListPropertiesUseCase);

    const properties = await listPropertiesUseCase.execute();

    return response.json(properties);
  }
}
