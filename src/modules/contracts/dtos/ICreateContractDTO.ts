interface ICreateContractDTO {
  description: string;
  contractor_id: string;
  customer_id: string;
  property_id: string;
  price: number;
  start_date: Date;
  end_date: Date;
  registration_id: string;
  registry_office: string;
}

export { ICreateContractDTO };
