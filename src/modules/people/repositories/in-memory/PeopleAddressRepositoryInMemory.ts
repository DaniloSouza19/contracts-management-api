import { ICreatePersonAddress } from '@modules/people/dtos/ICreatePersonAddress';
import { PersonAddress } from '@modules/people/infra/typeorm/entities/PersonAddress';

import { IPeopleAddressRepository } from '../IPeopleAddressRepository';

class PeopleAddressRepositoryInMemory implements IPeopleAddressRepository {
  private peopleAddress: PersonAddress[] = [];

  async create({
    cep,
    city,
    neighborhood,
    state,
    street,
  }: ICreatePersonAddress): Promise<PersonAddress> {
    const personAddress = new PersonAddress();

    Object.assign(personAddress, {
      cep,
      city,
      neighborhood,
      state,
      street,
    });

    this.peopleAddress.push(personAddress);

    return personAddress;
  }
}

export { PeopleAddressRepositoryInMemory };
