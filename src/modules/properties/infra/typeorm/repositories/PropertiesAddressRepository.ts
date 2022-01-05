import { ICreatePropertyAddressDTO } from '@modules/properties/dtos/ICreatePropertyAddressDTO';
import { IPropertiesAddressRepository } from '@modules/properties/repositories/IPropertiesAddressRepository';
import { getRepository, Repository } from 'typeorm';

import { PropertyAddress } from '../entities/PropertyAddress';

class PropertiesAddressRepository implements IPropertiesAddressRepository {
  private repository: Repository<PropertyAddress>;

  constructor() {
    this.repository = getRepository(PropertyAddress);
  }

  async create({
    city,
    neighborhood,
    postal_code,
    state,
    street,
  }: ICreatePropertyAddressDTO): Promise<PropertyAddress> {
    const propertyAddress = this.repository.create({
      city,
      neighborhood,
      postal_code,
      state,
      street,
    });

    await this.repository.save(propertyAddress);

    return propertyAddress;
  }

  async findById(id: string): Promise<PropertyAddress | undefined> {
    return this.repository.findOne(id);
  }
}

export { PropertiesAddressRepository };
