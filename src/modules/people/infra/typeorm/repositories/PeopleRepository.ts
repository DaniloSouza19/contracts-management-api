import { ICreatePersonDTO } from '@modules/people/dtos/ICreatePersonDTO';
import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { getRepository, Repository } from 'typeorm';

import { Person } from '../entities/Person';

class PeopleRepository implements IPeopleRepository {
  private repository: Repository<Person>;

  constructor() {
    this.repository = getRepository(Person);
  }

  async create({
    address_id,
    document_id,
    name,
    telephone,
    email,
    is_legal_person,
  }: ICreatePersonDTO): Promise<Person> {
    const person = this.repository.create({
      address_id,
      document_id,
      name,
      telephone,
      email,
      is_legal_person,
    });

    await this.repository.save(person);

    return person;
  }

  async findByDocumentId(document_id: string): Promise<Person | undefined> {
    return this.repository.findOne({
      where: {
        document_id,
      },
      relations: ['address'],
    });
  }

  async findById(id: string): Promise<Person | undefined> {
    return this.repository.findOne(id);
  }

  async list(): Promise<Person[]> {
    return this.repository.find({
      relations: ['address'],
    });
  }
}

export { PeopleRepository };
