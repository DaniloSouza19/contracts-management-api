import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id as string);

  if (!user) {
    throw new AppError('User does not exists', 400);
  }

  if (!user.is_admin) {
    throw new AppError('Not authorized! User is not admin', 401);
  }

  next();
}

export { ensureAdmin };
