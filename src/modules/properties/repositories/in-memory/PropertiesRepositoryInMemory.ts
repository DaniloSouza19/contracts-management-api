import { ICreatePropertyDTO } from '@modules/properties/dtos/ICreatePropertyDTO';
import { Property } from '@modules/properties/infra/typeorm/entities/Property';

import { IPropertiesRepository } from '../IPropertiesRepository';

class PropertiesRepositoryInMemory implements IPropertiesRepository {
  private properties: Property[] = [];

  async create({
    address_id,
    description,
    iptu_id,
    measure_amount,
    measure_type,
    owner_id,
    registration_id,
    registry_office,
  }: ICreatePropertyDTO): Promise<Property> {
    const property = new Property();

    Object.assign(property, {
      address_id,
      description,
      iptu_id,
      measure_amount,
      measure_type,
      owner_id,
      registration_id,
      registry_office,
    });

    this.properties.push(property);

    return property;
  }

  async findById(id: string): Promise<Property | undefined> {
    return this.properties.find((property) => property.id === id);
  }

  async list(): Promise<Property[]> {
    return this.properties;
  }
}

export { PropertiesRepositoryInMemory };
