import { CreatePersonAddressController } from '@modules/people/useCases/createPersonAddress/CreatePersonAddressController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const peopleAddressRouter = Router();

const createPersonAddressController = new CreatePersonAddressController();

peopleAddressRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      cep: Joi.string()
        .length(8)
        .pattern(/^\d+$/, {
          name: 'Only just numbers',
        })
        .required(),
      street: Joi.string().required(),
      state: Joi.string().required().length(2),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
    }),
  }),
  ensureAuthenticated,
  ensureAdmin,
  createPersonAddressController.handle
);

export { peopleAddressRouter };
