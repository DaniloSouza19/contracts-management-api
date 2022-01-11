import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateContractUseCase } from './CreateContractUseCase';

class CreateContractController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customer_id,
      property_id,
      description,
      end_date,
      price,
      registration_id,
      registry_office,
      start_date,
    } = request.body;

    const createContractUseCase = container.resolve(CreateContractUseCase);

    const contract = await createContractUseCase.execute({
      customer_id,
      property_id,
      description,
      start_date,
      end_date,
      price,
      registration_id,
      registry_office,
    });

    return response.status(201).json(contract);
  }
}

export { CreateContractController };
