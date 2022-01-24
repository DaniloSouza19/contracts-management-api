import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RenewContractUseCase } from './RenewContractUseCase';

class RenewContractController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.params;
    const { start_date, end_date, price } = request.body;

    const renewContractUseCase = container.resolve(RenewContractUseCase);

    const contractRenewHistory = await renewContractUseCase.execute({
      contract_id,
      end_date,
      price,
      start_date,
    });

    return response.json(contractRenewHistory);
  }
}

export { RenewContractController };
