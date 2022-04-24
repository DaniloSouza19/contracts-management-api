import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPaymentsUseCase } from './ListPaymentsUseCase';

export class ListPaymentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.query;
    const listPaymentsUseCase = container.resolve(ListPaymentsUseCase);

    const payments = await listPaymentsUseCase.execute(
      contract_id as string | undefined
    );

    const contractsWithSubtotal = payments.map((payment) => {
      return {
        ...payment,
        subtotal:
          Number(payment.value) -
          Number(payment.discount) +
          Number(payment.additional_fees),
      };
    });

    return response.json(contractsWithSubtotal);
  }
}
