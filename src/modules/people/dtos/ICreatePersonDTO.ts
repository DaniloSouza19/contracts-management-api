interface ICreatePersonDTO {
  name: string;
  is_legal_person?: boolean;
  document_id: string;
  telephone: string;
  email?: string;
  address_id: string;
}

export { ICreatePersonDTO };
