import { container } from 'tsyringe';

import { PropertiesAddressRepository } from '../infra/typeorm/repositories/PropertiesAddressRepository';
import { IPropertiesAddressRepository } from '../repositories/IPropertiesAddressRepository';

container.registerSingleton<IPropertiesAddressRepository>(
  'PropertiesAddressRepository',
  PropertiesAddressRepository
);
