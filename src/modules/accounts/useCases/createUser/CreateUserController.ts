import { UserMap } from '@modules/accounts/mappers/UserMap';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
    });

    const userDTO = UserMap.toDTO(user);

    return response.status(201).json(userDTO);
  }
}

export { CreateUserController };
