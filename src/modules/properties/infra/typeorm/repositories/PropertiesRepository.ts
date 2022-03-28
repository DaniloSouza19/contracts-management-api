import { ICreatePropertyDTO } from '@modules/properties/dtos/ICreatePropertyDTO';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { getRepository, Repository } from 'typeorm';

import { Property } from '../entities/Property';

class PropertiesRepository implements IPropertiesRepository {
  private repository: Repository<Property>;

  constructor() {
    this.repository = getRepository(Property);
  }

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
    const property = this.repository.create({
      address_id,
      description,
      iptu_id,
      measure_amount,
      measure_type,
      owner_id,
      registration_id,
      registry_office,
    });

    this.repository.save(property);

    return property;
  }

  async findById(id: string): Promise<Property | undefined> {
    return this.repository.findOne(id);
  }

  async list(): Promise<Property[]> {
    return this.repository.find({
      relations: ['address', 'owner'],
    });
  }
}

export { PropertiesRepository };
