import { ICreatePropertyAddressDTO } from '@modules/properties/dtos/ICreatePropertyAddressDTO';
import { PropertyAddress } from '@modules/properties/infra/typeorm/PropertyAddress';

import { IPropertiesAddressRepository } from '../IPropertiesAddressRepository';

class PropertiesAddressRepositoryInMemory
  implements IPropertiesAddressRepository
{
  private propertiesAddress: PropertyAddress[] = [];

  async create({
    city,
    neighborhood,
    postal_code,
    state,
    street,
  }: ICreatePropertyAddressDTO): Promise<PropertyAddress> {
    const propertyAddress = new PropertyAddress();

    Object.assign(propertyAddress, {
      city,
      neighborhood,
      postal_code,
      state,
      street,
    });

    this.propertiesAddress.push(propertyAddress);

    return propertyAddress;
  }
}

export { PropertiesAddressRepositoryInMemory };
