import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePersonUseCase } from './CreatePersonUseCase';

class CreatePersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { address_id, document_id, is_legal_person, name, telephone, email } =
      request.body;

    const createPersonUseCase = container.resolve(CreatePersonUseCase);

    const person = await createPersonUseCase.execute({
      address_id,
      document_id,
      is_legal_person,
      name,
      telephone,
      email,
    });

    return response.status(201).json(person);
  }
}

export { CreatePersonController };
