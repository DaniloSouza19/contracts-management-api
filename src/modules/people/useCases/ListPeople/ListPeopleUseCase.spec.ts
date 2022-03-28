import { PeopleAddressRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleAddressRepositoryInMemory';
import { PeopleRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleRepositoryInMemory';

import { ListPeopleUseCase } from './ListPeopleUseCase';

let listPeopleUseCase: ListPeopleUseCase;
let peopleRepositoryInMemory: PeopleRepositoryInMemory;
let peopleAddressRepositoryInMemory: PeopleAddressRepositoryInMemory;

describe('List all People', () => {
  beforeEach(() => {
    peopleRepositoryInMemory = new PeopleRepositoryInMemory();

    peopleAddressRepositoryInMemory = new PeopleAddressRepositoryInMemory();

    listPeopleUseCase = new ListPeopleUseCase(peopleRepositoryInMemory);
  });

  it('Should be able to list all People', async () => {
    // Input values
    const address = await peopleAddressRepositoryInMemory.create({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    const person1 = await peopleRepositoryInMemory.create({
      address_id: address.id,
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
      email: 'johndoe@example.com',
    });

    await peopleAddressRepositoryInMemory.create({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    const person2 = await peopleRepositoryInMemory.create({
      address_id: address.id,
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
      email: 'johndoe@example.com',
    });

    const people = await listPeopleUseCase.execute();

    expect(people).toEqual(expect.arrayContaining([person1, person2]));
  });
});
