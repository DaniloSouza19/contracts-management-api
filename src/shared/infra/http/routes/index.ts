import { usersRouter } from '@modules/accounts/infra/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);

export { routes };
