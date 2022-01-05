import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesAddressRepository } from '@modules/properties/repositories/IPropertiesAddressRepository';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { inject, injectable } from 'tsyringe';

import { PersonDoesNotExistsError } from './errors/PersonDoesNotExistsError';
import { PropertyAddressDoesNotExistsError } from './errors/PropertyAddressDoesNotExistsError';

interface IRequest {
  description: string;
  owner_id: string;
  address_id: string;
  iptu_id: string;
  registration_id: string;
  registry_office: string;
  measure_type: string;
  measure_amount: number;
}

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('PropertiesAddressRepository')
    private propertiesAddressRepository: IPropertiesAddressRepository
  ) {}

  async execute({
    address_id,
    description,
    iptu_id,
    measure_amount,
    measure_type,
    owner_id,
    registration_id,
    registry_office,
  }: IRequest): Promise<Property> {
    const personExists = await this.peopleRepository.findById(owner_id);

    if (!personExists) {
      throw new PersonDoesNotExistsError();
    }

    const propertyAddress = await this.propertiesAddressRepository.findById(
      address_id
    );

    if (!propertyAddress) {
      throw new PropertyAddressDoesNotExistsError();
    }

    const property = await this.propertiesRepository.create({
      address_id,
      description,
      iptu_id,
      measure_amount,
      measure_type,
      owner_id,
      registration_id,
      registry_office,
    });

    return property;
  }
}

export { CreatePropertyUseCase };
