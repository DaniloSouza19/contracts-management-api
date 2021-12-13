import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it('Should be able to authenticate user', async () => {
    await createUserUseCase.execute({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    const session = await authenticateUserUseCase.execute({
      email: 'johndoe@example.com',
      password: '1234',
    });

    expect(session).toHaveProperty('token');
  });

  it('Should not be able to authenticate a non existing user', async () => {
    await expect(async () =>
      authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate user with an incorrect password', async () => {
    await expect(async () => {
      await usersRepositoryInMemory.create({
        name: 'Jhon Doe',
        email: 'johndoe@example.com',
        password: '1234',
      });

      await authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
