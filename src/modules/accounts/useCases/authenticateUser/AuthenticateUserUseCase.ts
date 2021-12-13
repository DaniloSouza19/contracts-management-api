import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

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

class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('E-mail or password does not match', 401);
    }

    const passwordMath = await compare(password, userExists.password);

    if (!passwordMath) {
      throw new AppError('E-mail or password does not match', 401);
    }

    const token = sign({}, '97b2410ef3e86fa5b4d86ce23e115c45', {
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
