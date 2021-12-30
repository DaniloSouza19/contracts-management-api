import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';

import { PersonDoesNotExistsError } from './errors/PersonDoesNotExistsError';

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

class CreatePropertyUseCase {
  constructor(
    private propertiesRepository: IPropertiesRepository,
    private peopleRepository: IPeopleRepository
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
