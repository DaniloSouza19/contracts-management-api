interface ICreatePropertyDTO {
  description: string;
  owner_id: string;
  address_id: string;
  iptu_id: string;
  registration_id: string;
  registry_office: string;
  measure_type: string;
  measure_amount: number;
}

export { ICreatePropertyDTO };
