import { ICreatePaymentDTO } from '../dtos/ICreatePaymentDTO';
import { IToPayDTO } from '../dtos/IToPayDTO';
import { Payment } from '../infra/entities/Payment';

interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  toPay(data: IToPayDTO): Promise<void>;
  findById(id: string): Promise<Payment | undefined>;
  list(contract_id?: string): Promise<Payment[]>;
}

export { IPaymentsRepository };
