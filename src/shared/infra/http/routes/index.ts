import { authenticateRouter } from '@modules/accounts/infra/routes/authenticate.routes';
import { usersRouter } from '@modules/accounts/infra/routes/user.routes';
import { peopleAddressRouter } from '@modules/people/infra/http/routes/peopleAddress.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', authenticateRouter);
routes.use('/people-address', peopleAddressRouter);

export { routes };
