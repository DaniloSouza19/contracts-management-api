import { CreatePropertyController } from '@modules/properties/useCases/createProperty/CreatePropertyController';
import { ListPropertiesController } from '@modules/properties/useCases/ListProperties/ListPropertiesController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const propertiesRouter = Router();

const createPropertyController = new CreatePropertyController();

const listPropertiesController = new ListPropertiesController();

propertiesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: Joi.object({
      description: Joi.string(),
      owner_id: Joi.string().uuid(),
      address_id: Joi.string().uuid(),
      iptu_id: Joi.string(),
      registration_id: Joi.string(),
      registry_office: Joi.string(),
      measure_type: Joi.string(),
      measure_amount: Joi.number(),
    }),
  }),
  createPropertyController.handle
);

propertiesRouter.get('/', listPropertiesController.handle);

export { propertiesRouter };
