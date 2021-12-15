import { CreatePersonController } from '@modules/people/useCases/createPerson/CreatePersonController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const peopleRouter = Router();

const createPersonController = new CreatePersonController();

peopleRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      is_legal_person: Joi.boolean().default(false),
      document_id: Joi.string().required(),
      telephone: Joi.string().required().min(6),
      email: Joi.string().email(),
      address_id: Joi.string().required().uuid(),
    }),
  }),
  createPersonController.handle
);

export { peopleRouter };
