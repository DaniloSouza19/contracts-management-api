import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUserController.handle
);

export { usersRouter };
