import { PersonAddress } from '@modules/people/infra/typeorm/entities/PersonAddress';
import { IPeopleAddressRepository } from '@modules/people/repositories/IPeopleAddressRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  postal_code: string;
  street: string;
  state: string;
  city: string;
  neighborhood: string;
}

@injectable()
class CreatePersonAddressUseCase {
  constructor(
    @inject('PeopleAddressRepository')
    private personAddress: IPeopleAddressRepository
  ) {}

  async execute({
    postal_code,
    city,
    neighborhood,
    state,
    street,
  }: IRequest): Promise<PersonAddress> {
    const address = await this.personAddress.create({
      postal_code,
      city,
      neighborhood,
      state,
      street,
    });

    return address;
  }
}

export { CreatePersonAddressUseCase };
