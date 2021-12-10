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
    const user = await this.usersRepository.create({
      email,
      name,
      password,
    });

    return user;
  }
}

export { CreateUserUseCase };
