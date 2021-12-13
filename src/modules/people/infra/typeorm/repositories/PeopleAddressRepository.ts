import { ICreatePersonAddress } from '@modules/people/dtos/ICreatePersonAddress';
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
  }: ICreatePersonAddress): Promise<PersonAddress> {
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
}

export { PeopleAddressRepository };
