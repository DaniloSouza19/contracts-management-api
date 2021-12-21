import { ICreatePersonAddressDTO } from '@modules/people/dtos/ICreatePersonAddressDTO';
import { PersonAddress } from '@modules/people/infra/typeorm/entities/PersonAddress';

import { IPeopleAddressRepository } from '../IPeopleAddressRepository';

class PeopleAddressRepositoryInMemory implements IPeopleAddressRepository {
  private peopleAddress: PersonAddress[] = [];

  async create({
    postal_code,
    city,
    neighborhood,
    state,
    street,
  }: ICreatePersonAddressDTO): Promise<PersonAddress> {
    const personAddress = new PersonAddress();

    Object.assign(personAddress, {
      postal_code,
      city,
      neighborhood,
      state,
      street,
    });

    this.peopleAddress.push(personAddress);

    return personAddress;
  }

  async findById(id: string): Promise<PersonAddress | undefined> {
    return this.peopleAddress.find((address) => address.id === id);
  }
}

export { PeopleAddressRepositoryInMemory };
