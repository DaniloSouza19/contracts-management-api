import { Property } from '@modules/properties/infra/typeorm/entities/Property';
import { IPropertiesRepository } from '@modules/properties/repositories/IPropertiesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPropertiesUseCase {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute(): Promise<Property[]> {
    const properties = await this.propertiesRepository.list();

    return properties;
  }
}
