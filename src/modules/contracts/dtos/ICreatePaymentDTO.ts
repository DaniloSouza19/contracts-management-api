interface ICreatePaymentDTO {
  description: string;
  contract_id: string;
  payment_date?: Date;
  due_date: Date;
  value: number;
  is_paid?: boolean;
  additional_fees?: number;
  discount?: number;
}

export { ICreatePaymentDTO };
