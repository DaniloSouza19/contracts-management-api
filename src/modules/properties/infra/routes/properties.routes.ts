import { CreatePropertyController } from '@modules/properties/useCases/createProperty/CreatePropertyController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const propertiesRouter = Router();

const createPropertyController = new CreatePropertyController();

propertiesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: Joi.object({
      description: Joi.string(),
      owner_id: Joi.string(),
      address_id: Joi.string(),
      iptu_id: Joi.string(),
      registration_id: Joi.string(),
      registry_office: Joi.string(),
      measure_type: Joi.string(),
      measure_amount: Joi.number(),
    }),
  }),
  createPropertyController.handle
);

export { propertiesRouter };
