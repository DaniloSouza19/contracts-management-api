import { container } from 'tsyringe';

import { PeopleAddressRepository } from '../infra/typeorm/repositories/PeopleAddressRepository';
import { PeopleRepository } from '../infra/typeorm/repositories/PeopleRepository';
import { IPeopleAddressRepository } from '../repositories/IPeopleAddressRepository';
import { IPeopleRepository } from '../repositories/IPeopleRepository';

container.registerSingleton<IPeopleAddressRepository>(
  'PeopleAddressRepository',
  PeopleAddressRepository
);

container.registerSingleton<IPeopleRepository>(
  'PeopleRepository',
  PeopleRepository
);
