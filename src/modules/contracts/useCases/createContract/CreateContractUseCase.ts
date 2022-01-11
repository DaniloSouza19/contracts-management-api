import { ContractorDoesNotFound } from '@modules/contracts/errors/ContractorDoesNotFoundError';
import { CustomerDoesNotFound } from '@modules/contracts/errors/CustomerDoesNotFoundError';
import { InvalidEndDateError } from '@modules/contracts/errors/InvalidEndDateError';
import { PropertyDoesNotFoundError } from '@modules/contracts/errors/PropertyDoesNotFoundError';
import { Contract } from '@modules/contracts/infra/entities/Contract';
import { IContractsRepository } from '@modules/contracts/repositories/IContractsRepository';
import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  description: string;
  customer_id: string;
  property_id: string;
  price: number;
  start_date: Date;
  end_date: Date;
  registration_id: string;
  registry_office: string;
}

@injectable()
class CreateContractUseCase {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute({
    customer_id,
    property_id,
    description,
    end_date,
    price,
    registration_id,
    registry_office,
    start_date,
  }: IRequest): Promise<Contract> {
    const invalidEndDate = isBefore(end_date, start_date);

    if (invalidEndDate) {
      throw new InvalidEndDateError();
    }

    const customer = await this.peopleRepository.findById(customer_id);

    if (!customer) {
      throw new CustomerDoesNotFound();
    }

    const property = await this.propertiesRepository.findById(property_id);

    if (!property) {
      throw new PropertyDoesNotFoundError();
    }

    const contractor = await this.peopleRepository.findById(property.owner_id);

    if (!contractor) {
      throw new ContractorDoesNotFound();
    }

    const contract = await this.contractsRepository.create({
      contractor_id: contractor.id,
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
