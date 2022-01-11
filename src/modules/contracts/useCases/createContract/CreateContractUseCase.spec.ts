import { ContractsRepositoryInMemory } from '@modules/contracts/repositories/in-memory/ContractsRepositoryInMemory';
import { PeopleRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleRepositoryInMemory';
import { PropertiesRepositoryInMemory } from '@modules/properties/repositories/in-memory/PropertiesRepositoryInMemory';
import { addDays, addYears } from 'date-fns';

import { AppError } from '@shared/errors/AppError';

import { CreateContractUseCase } from './CreateContractUseCase';

let createContractUseCase: CreateContractUseCase;
let contractsRepositoryInMemory: ContractsRepositoryInMemory;
let peopleRepositoryInMemory: PeopleRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;

describe('Create a new Contract', () => {
  beforeEach(() => {
    contractsRepositoryInMemory = new ContractsRepositoryInMemory();
    peopleRepositoryInMemory = new PeopleRepositoryInMemory();
    propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();

    createContractUseCase = new CreateContractUseCase(
      contractsRepositoryInMemory,
      peopleRepositoryInMemory,
      propertiesRepositoryInMemory
    );
  });

  it('Should not be able to create a new contract with non-existing contractor', async () => {
    const { id: customer_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'John Doe',
      telephone: '+556299999999',
    });

    const { id: property_id } = await propertiesRepositoryInMemory.create({
      address_id: 'some-address-id',
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: 'some-person-id',
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    await expect(async () => {
      await createContractUseCase.execute({
        description: 'Rent contract example',
        customer_id,
        property_id,
        price: 1200,
        start_date: new Date(),
        end_date: addYears(new Date(), 1),
        registration_id: '123456',
        registry_office: 'Some office',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new contract with non-existing customer', async () => {
    const { id: contractor_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'Jack John',
      telephone: '+556299999999',
    });

    const { id: property_id } = await propertiesRepositoryInMemory.create({
      address_id: 'some-address-id',
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: 'some-person-id',
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    await expect(async () => {
      await createContractUseCase.execute({
        description: 'Rent contract example',
        customer_id: 'invalid-customer-id',
        property_id,
        price: 1200,
        start_date: new Date(),
        end_date: addYears(new Date(), 1),
        registration_id: '123456',
        registry_office: 'Some office',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new contract with non-existing property', async () => {
    const { id: customer_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'John Doe',
      telephone: '+556299999999',
    });

    await expect(async () => {
      await createContractUseCase.execute({
        description: 'Rent contract example',
        customer_id,
        property_id: 'invalid-property-id',
        price: 1200,
        start_date: new Date(),
        end_date: addYears(new Date(), 1),
        registration_id: '123456',
        registry_office: 'Some office',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new contract with end date before start date', async () => {
    const { id: contractor_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'John Doe',
      telephone: '+556299999999',
    });

    const { id: customer_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'Jack John',
      telephone: '+556299999998',
    });

    const { id: property_id } = await propertiesRepositoryInMemory.create({
      address_id: 'some-address-id',
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: contractor_id,
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    const start_date = addDays(new Date(), 1);
    const end_date = new Date();

    await expect(async () => {
      await createContractUseCase.execute({
        description: 'Rent contract example',
        customer_id,
        property_id,
        price: 1200,
        start_date,
        end_date,
        registration_id: '123456',
        registry_office: 'Some office',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new contract', async () => {
    const { id: contractor_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'John Doe',
      telephone: '+556299999999',
    });

    const { id: customer_id } = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '123456',
      name: 'Jack John',
      telephone: '+556299999998',
    });

    const { id: property_id } = await propertiesRepositoryInMemory.create({
      address_id: 'some-address-id',
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: contractor_id,
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    const start_date = new Date();
    const end_date = addYears(new Date(), 1);

    const contract = await createContractUseCase.execute({
      description: 'Rent contract example',
      customer_id,
      property_id,
      price: 1200,
      start_date,
      end_date,
      registration_id: '123456',
      registry_office: 'Some office',
    });

    expect(contract).toHaveProperty('id');
    expect(contract.customer_id).toEqual(customer_id);
    expect(contract.contractor_id).toEqual(contractor_id);
    expect(contract.start_date).toEqual(start_date);
    expect(contract.end_date).toEqual(end_date);
  });
});
