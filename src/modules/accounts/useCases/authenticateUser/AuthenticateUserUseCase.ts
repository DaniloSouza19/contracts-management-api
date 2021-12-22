import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IncorrectEmailOrPasswordError } from './errors/IncorrectEmailOrPasswordError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMath = await compare(password, userExists.password);

    if (!passwordMath) {
      throw new IncorrectEmailOrPasswordError();
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: userExists.id,
      expiresIn: '4h',
    });

    return {
      token,
      user: {
        name: userExists.name,
        email: userExists.email,
      },
    };
  }
}

export { AuthenticateUserUseCase };
