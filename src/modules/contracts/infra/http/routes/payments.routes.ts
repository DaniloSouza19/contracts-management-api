import { MakePaymentController } from '@modules/contracts/useCases/makePayment/MakePaymentController';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const paymentsRouter = Router();

const makePaymentController = new MakePaymentController();

paymentsRouter.put(
  '/:payment_id/pay',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.PARAMS]: {
      payment_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      payment_date: Joi.date().required(),
    },
  }),
  makePaymentController.handle
);

export { paymentsRouter };