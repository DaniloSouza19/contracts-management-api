import { ContractorDoesNotFound } from '@modules/contracts/errors/ContractorDoesNotFoundError';
import { CustomerDoesNotFound } from '@modules/contracts/errors/CustomerDoesNotFoundError';
import { PropertyDoesNotFoundError } from '@modules/contracts/errors/PropertyDoesNotFoundError';
import { Contract } from '@modules/contracts/infra/Contract';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';
import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';

interface IRequest {
  description: string;
  contractor_id: string;
  customer_id: string;
  property_id: string;
  price: number;
  start_date: Date;
  end_date: Date;
  registration_id: string;
  registry_office: string;
}

class CreateContractUseCase {
  constructor(
    private contractsRepository: IContractsRepository,
    private peopleRepository: IPeopleRepository,
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute({
    contractor_id,
    customer_id,
    property_id,
    description,
    end_date,
    price,
    registration_id,
    registry_office,
    start_date,
  }: IRequest): Promise<Contract> {
    const contractor = await this.peopleRepository.findById(contractor_id);

    if (!contractor) {
      throw new ContractorDoesNotFound();
    }

    const customer = await this.peopleRepository.findById(customer_id);

    if (!customer) {
      throw new CustomerDoesNotFound();
    }

    const property = await this.propertiesRepository.findById(property_id);

    if (!property) {
      throw new PropertyDoesNotFoundError();
    }

    const contract = await this.contractsRepository.create({
      contractor_id,
      customer_id,
      property_id,
      description,
      end_date,
      price,
      registration_id,
      registry_office,
      start_date,
    });

    return contract;
  }
}

export { CreateContractUseCase };
