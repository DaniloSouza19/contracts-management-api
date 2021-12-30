import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { Person } from '../infra/typeorm/entities/Person';

interface IPeopleRepository {
  create(data: ICreatePersonDTO): Promise<Person>;
  findByDocumentId(document_id: string): Promise<Person | undefined>;
  findById(id: string): Promise<Person | undefined>;
}

export { IPeopleRepository };
