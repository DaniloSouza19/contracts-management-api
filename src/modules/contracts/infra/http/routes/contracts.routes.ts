import { CreateContractController } from '@modules/contracts/useCases/createContract/CreateContractController';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const contractsRouter = Router();

const createContractController = new CreateContractController();

contractsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: Joi.object({
      description: Joi.string().required(),
      customer_id: Joi.string().required().uuid(),
      property_id: Joi.string().required().uuid(),
      price: Joi.number().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      registration_id: Joi.string().required(),
      registry_office: Joi.string().required(),
    }),
  }),
  createContractController.handle
);

export { contractsRouter };
