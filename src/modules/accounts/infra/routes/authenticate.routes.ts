import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  authenticateUserController.handle
);

export { authenticateRouter };
