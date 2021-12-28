import { CreatePropertyAddressController } from '@modules/properties/useCases/createPropertyAddress/CreatePropertyAddressController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const propertiesAddressRouter = Router();

const createPropertyAddressController = new CreatePropertyAddressController();

propertiesAddressRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: Joi.object({
      postal_code: Joi.string()
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
  createPropertyAddressController.handle
);

export { propertiesAddressRouter };
