import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create a user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to create a user', async () => {
    const user = await createUserUseCase.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@example.com');
  });

  it('Should not be able to create a user with an already existing email', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
      });

      await createUserUseCase.execute({
        email: 'johndoe@example.com',
        name: 'John',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
