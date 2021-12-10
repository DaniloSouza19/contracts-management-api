import { User } from '@modules/accounts/infra/entities/User';
import { Router } from 'express';

const routes = Router();

console.log(User);

routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export { routes };
