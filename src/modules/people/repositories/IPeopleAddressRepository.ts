import { ICreatePersonAddressDTO } from '../dtos/ICreatePersonAddressDTO';
import { PersonAddress } from '../infra/typeorm/entities/PersonAddress';

interface IPeopleAddressRepository {
  create(data: ICreatePersonAddressDTO): Promise<PersonAddress>;
  findById(id: string): Promise<PersonAddress | undefined>;
}

export { IPeopleAddressRepository };
