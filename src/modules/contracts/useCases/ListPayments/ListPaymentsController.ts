import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPaymentsUseCase } from './ListPaymentsUseCase';

export class ListPaymentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.query;
    const listPaymentsUseCase = container.resolve(ListPaymentsUseCase);

    const payments = await listPaymentsUseCase.execute(
      contract_id as string | undefined
    );

    return response.json(payments);
  }
}
