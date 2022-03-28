import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPeopleUseCase } from './ListPeopleUseCase';

export class ListPeopleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPeopleUseCase = container.resolve(ListPeopleUseCase);

    const people = await listPeopleUseCase.execute();

    return response.json(people);
  }
}
