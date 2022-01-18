import { CreateContractController } from '@modules/contracts/useCases/createContract/CreateContractController';
import { CreatePaymentController } from '@modules/contracts/useCases/createPayment/CreatePaymentController';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const contractsRouter = Router();

const createContractController = new CreateContractController();

const createPaymentUseCase = new CreatePaymentController();

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

contractsRouter.post(
  '/:contract_id/payments',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.PARAMS]: {
      contract_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required(),
      due_date: Joi.date().required(),
      payment_date: Joi.date(),
      additional_fees: Joi.number(),
      discount: Joi.number(),
    },
  }),
  createPaymentUseCase.handle
);

export { contractsRouter };
