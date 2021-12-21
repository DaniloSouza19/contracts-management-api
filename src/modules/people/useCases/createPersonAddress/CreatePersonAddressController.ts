import e, { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePersonAddressUseCase } from './CreatePersonAddressUseCase';

class CreatePersonAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postal_code, city, neighborhood, state, street } = request.body;

    const createPersonAddressUseCase = container.resolve(
      CreatePersonAddressUseCase
    );

    const personAddress = await createPersonAddressUseCase.execute({
      postal_code,
      city,
      neighborhood,
      state,
      street,
    });

    return response.status(201).json(personAddress);
  }
}

export { CreatePersonAddressController };
