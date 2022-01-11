import { ICreatePropertyDTO } from '../dtos/ICreatePropertyDTO';
import { Property } from '../infra/typeorm/entities/Property';

interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property>;
  findById(id: string): Promise<Property | undefined>;
}

export { IPropertiesRepository };
