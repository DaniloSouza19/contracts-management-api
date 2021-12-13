import { container } from 'tsyringe';

import { PeopleAddressRepository } from '../infra/typeorm/repositories/PeopleAddressRepository';
import { IPeopleAddressRepository } from '../repositories/IPeopleAddressRepository';

container.registerSingleton<IPeopleAddressRepository>(
  'PeopleAddressRepository',
  PeopleAddressRepository
);
