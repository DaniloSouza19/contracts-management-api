import { ICreatePersonAddressDTO } from '@modules/people/dtos/ICreatePersonAddressDTO';
import { IPeopleAddressRepository } from '@modules/people/repositories/IPeopleAddressRepository';
import { getRepository, Repository } from 'typeorm';

import { PersonAddress } from '../entities/PersonAddress';

class PeopleAddressRepository implements IPeopleAddressRepository {
  private repository: Repository<PersonAddress>;

  constructor() {
    this.repository = getRepository(PersonAddress);
  }

  async create({
    cep,
    city,
    neighborhood,
    state,
    street,
  }: ICreatePersonAddressDTO): Promise<PersonAddress> {
    const personAddress = this.repository.create({
      cep,
      city,
      neighborhood,
      state,
      street,
    });

    await this.repository.save(personAddress);

    return personAddress;
  }

  async findById(id: string): Promise<PersonAddress | undefined> {
    return this.repository.findOne(id);
  }
}

export { PeopleAddressRepository };
