import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPaymentsUseCase } from './ListPaymentsUseCase';

export class ListPaymentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contract_id, only_pay } = request.query;
    const listPaymentsUseCase = container.resolve(ListPaymentsUseCase);

    const payments = await listPaymentsUseCase.execute({
      contract_id: contract_id ? String(contract_id) : undefined,
      only_pay: only_pay ? Boolean(only_pay) : undefined,
    });

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
