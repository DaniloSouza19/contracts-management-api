interface ICreateContractRenewHistoryDTO {
  id: string;
  contract_id: string;
  new_price: number;
  old_price: number;
  new_start_date: Date;
  new_end_date: Date;
  old_start_date: Date;
  old_end_date: Date;
}

export { ICreateContractRenewHistoryDTO };
