import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MakePaymentUseCase } from './MakePaymentUseCase';

class MakePaymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { payment_id } = request.params;
    const { payment_date } = request.body;

    const makePaymentUseCase = container.resolve(MakePaymentUseCase);

    await makePaymentUseCase.execute({
      payment_date,
      payment_id,
    });

    return response.status(204).send();
  }
}

export { MakePaymentController };
