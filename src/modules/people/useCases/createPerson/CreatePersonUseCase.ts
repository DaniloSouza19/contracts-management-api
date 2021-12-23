import { Person } from '@modules/people/infra/typeorm/entities/Person';
import { IPeopleAddressRepository } from '@modules/people/repositories/IPeopleAddressRepository';
import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { inject, injectable } from 'tsyringe';

import { AddressNotFound } from './errors/AddressNotFoundError';
import { DocumentIdAlreadyExistsError } from './errors/DocumentIdAlreadyExistsError';

interface IRequest {
  name: string;
  is_legal_person?: boolean;
  document_id: string;
  telephone: string;
  email?: string;
  address_id: string;
}

@injectable()
class CreatePersonUseCase {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('PeopleAddressRepository')
    private peopleAddressRepository: IPeopleAddressRepository
  ) {}

  async execute({
    address_id,
    document_id,
    is_legal_person = false,
    name,
    telephone,
    email,
  }: IRequest): Promise<Person> {
    const personExists = await this.peopleRepository.findByDocumentId(
      document_id
    );

    if (personExists) {
      throw new DocumentIdAlreadyExistsError();
    }

    const addressExist = await this.peopleAddressRepository.findById(
      address_id
    );

    if (!addressExist) {
      throw new AddressNotFound();
    }

    const person = await this.peopleRepository.create({
      address_id,
      document_id,
      is_legal_person,
      name,
      telephone,
      email,
    });

    person.address = addressExist;

    return person;
  }
}

export { CreatePersonUseCase };
