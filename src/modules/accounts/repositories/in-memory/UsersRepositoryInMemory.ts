import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
    });

    this.users.push(user);

    console.log(user);

    return user;
  }
}

export { UsersRepositoryInMemory };
