import { authenticateRouter } from '@modules/accounts/infra/routes/authenticate.routes';
import { usersRouter } from '@modules/accounts/infra/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', authenticateRouter);

export { routes };
