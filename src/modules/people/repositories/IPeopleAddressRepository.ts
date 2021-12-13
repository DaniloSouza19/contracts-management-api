import { ICreatePersonAddress } from '../dtos/ICreatePersonAddress';
import { PersonAddress } from '../infra/typeorm/entities/PersonAddress';

interface IPeopleAddressRepository {
  create(data: ICreatePersonAddress): Promise<PersonAddress>;
}

export { IPeopleAddressRepository };
