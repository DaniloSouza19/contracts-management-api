import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { Person } from '../infra/typeorm/entities/Person';

interface IPeopleRepository {
  create(data: ICreatePersonDTO): Promise<Person>;
}

export { IPeopleRepository };
