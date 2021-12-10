import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
