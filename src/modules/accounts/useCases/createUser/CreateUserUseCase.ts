import { hash } from 'bcrypt';

import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../infra/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };