import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePaymentUseCase } from './CreatePaymentUseCase';

class CreatePaymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.params;
    const { description, due_date, payment_date, additional_fees, discount } =
      request.body;

    const createPaymentUseCase = container.resolve(CreatePaymentUseCase);

    const payment = await createPaymentUseCase.execute({
      contract_id,
      description,
      due_date,
      payment_date,
      additional_fees,
      discount,
    });

    return response.status(201).json(payment);
  }
}

export { CreatePaymentController };
