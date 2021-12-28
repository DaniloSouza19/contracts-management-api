import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePropertyAddressUseCase } from './CreatePropertyAddressUseCase';

class CreatePropertyAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postal_code, city, neighborhood, state, street } = request.body;

    const createPropertyAddressUseCase = container.resolve(
      CreatePropertyAddressUseCase
    );

    const propertyAddress = await createPropertyAddressUseCase.execute({
      postal_code,
      city,
      neighborhood,
      state,
      street,
    });

    return response.status(201).json(propertyAddress);
  }
}

export { CreatePropertyAddressController };
