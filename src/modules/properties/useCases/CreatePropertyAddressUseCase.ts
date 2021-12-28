import { PropertyAddress } from '../infra/typeorm/PropertyAddress';
import { IPropertiesAddressRepository } from '../repositories/IPropertiesAddressRepository';

interface IRequest {
  postal_code: string;
  street: string;
  state: string;
  city: string;
  neighborhood: string;
}

class CreatePropertyAddressUseCase {
  constructor(
    private propertiesAddressRepository: IPropertiesAddressRepository
  ) {}

  async execute({
    postal_code,
    city,
    neighborhood,
    state,
    street,
  }: IRequest): Promise<PropertyAddress> {
    const propertyAddress = await this.propertiesAddressRepository.create({
      postal_code,
      city,
      neighborhood,
      state,
      street,
    });

    return propertyAddress;
  }
}

export { CreatePropertyAddressUseCase };
