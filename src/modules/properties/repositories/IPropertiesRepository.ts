import { ICreatePropertyDTO } from '../dtos/ICreatePropertyDTO';
import { Property } from '../infra/typeorm/entities/Property';

interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property>;
}

export { IPropertiesRepository };
