import { container } from 'tsyringe';

import { PropertiesAddressRepository } from '../infra/typeorm/repositories/PropertiesAddressRepository';
import { PropertiesRepository } from '../infra/typeorm/repositories/PropertiesRepository';
import { IPropertiesAddressRepository } from '../repositories/IPropertiesAddressRepository';
import { IPropertiesRepository } from '../repositories/IPropertiesRepository';

container.registerSingleton<IPropertiesAddressRepository>(
  'PropertiesAddressRepository',
  PropertiesAddressRepository
);

container.registerSingleton<IPropertiesRepository>(
  'PropertiesRepository',
  PropertiesRepository
);
