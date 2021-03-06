import { ICreatePersonDTO } from '@modules/people/dtos/ICreatePersonDTO';
import { Person } from '@modules/people/infra/typeorm/entities/Person';

import { IPeopleRepository } from '../IPeopleRepository';

class PeopleRepositoryInMemory implements IPeopleRepository {
  private people: Person[] = [];

  async create({
    address_id,
    document_id,
    is_legal_person,
    name,
    telephone,
    email,
  }: ICreatePersonDTO): Promise<Person> {
    const person = new Person();

    Object.assign(person, {
      address_id,
      document_id,
      is_legal_person,
      name,
      telephone,
      email,
    });

    this.people.push(person);

    return person;
  }

  async findByDocumentId(document_id: string): Promise<Person | undefined> {
    const person = this.people.find(
      (person) => person.document_id === document_id
    );

    return person;
  }

  async findById(id: string): Promise<Person | undefined> {
    const person = this.people.find((person) => person.id === id);

    return person;
  }

  async list(): Promise<Person[]> {
    return this.people;
  }
}

export { PeopleRepositoryInMemory };
