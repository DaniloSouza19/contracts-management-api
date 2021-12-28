import { PropertyAddress } from '@modules/properties/infra/typeorm/entities/PropertyAddress';
import { IPropertiesAddressRepository } from '@modules/properties/repositories/IPropertiesAddressRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  postal_code: string;
  street: string;
  state: string;
  city: string;
  neighborhood: string;
}

@injectable()
class CreatePropertyAddressUseCase {
  constructor(
    @inject('PropertiesAddressRepository')
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
