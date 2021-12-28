import { authenticateRouter } from '@modules/accounts/infra/routes/authenticate.routes';
import { usersRouter } from '@modules/accounts/infra/routes/user.routes';
import { peopleRouter } from '@modules/people/infra/http/routes/people.routes';
import { peopleAddressRouter } from '@modules/people/infra/http/routes/peopleAddress.routes';
import { propertiesAddressRouter } from '@modules/properties/infra/routes/propertiesAddress.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', authenticateRouter);
routes.use('/people-address', peopleAddressRouter);
routes.use('/people', peopleRouter);
routes.use('/properties-address', propertiesAddressRouter);

export { routes };
