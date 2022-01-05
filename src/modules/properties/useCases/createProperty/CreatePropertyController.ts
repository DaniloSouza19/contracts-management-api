import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePropertyUseCase } from './CreatePropertyUseCase';

class CreatePropertyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      owner_id,
      address_id,
      iptu_id,
      registration_id,
      registry_office,
      measure_type,
      measure_amount,
    } = request.body;

    const createPropertyUseCase = container.resolve(CreatePropertyUseCase);

    const property = await createPropertyUseCase.execute({
      description,
      owner_id,
      address_id,
      iptu_id,
      registration_id,
      registry_office,
      measure_type,
      measure_amount,
    });

    return response.status(201).json(property);
  }
}

export { CreatePropertyController };
