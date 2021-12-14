import { Person } from '@modules/people/infra/typeorm/entities/Person';
import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';

interface IRequest {
  name: string;
  is_legal_person?: boolean;
  document_id: string;
  telephone: string;
  email?: string;
  address_id: string;
}

class CreatePersonUseCase {
  constructor(private peopleRepository: IPeopleRepository) {}

  async execute({
    address_id,
    document_id,
    is_legal_person = false,
    name,
    telephone,
    email,
  }: IRequest): Promise<Person> {
    const person = await this.peopleRepository.create({
      address_id,
      document_id,
      is_legal_person,
      name,
      telephone,
      email,
    });

    return person;
  }
}

export { CreatePersonUseCase };
