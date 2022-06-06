import { ICreatePaymentDTO } from '../dtos/ICreatePaymentDTO';
import { IListPaymentsDTO } from '../dtos/IListPaymentsDTO';
import { IToPayDTO } from '../dtos/IToPayDTO';
import { Payment } from '../infra/entities/Payment';

interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<Payment>;
  toPay(data: IToPayDTO): Promise<void>;
  findById(id: string): Promise<Payment | undefined>;
  list(data: IListPaymentsDTO): Promise<Payment[]>;
}

export { IPaymentsRepository };
