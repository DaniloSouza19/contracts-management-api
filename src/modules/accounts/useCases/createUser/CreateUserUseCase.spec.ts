import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create a user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to create an user', async () => {
    const user = await createUserUseCase.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@example.com');
  });
});
