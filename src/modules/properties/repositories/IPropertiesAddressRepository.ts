import { ICreatePropertyAddressDTO } from '../dtos/ICreatePropertyAddressDTO';
import { PropertyAddress } from '../infra/typeorm/entities/PropertyAddress';

interface IPropertiesAddressRepository {
  create(data: ICreatePropertyAddressDTO): Promise<PropertyAddress>;
}

export { IPropertiesAddressRepository };
