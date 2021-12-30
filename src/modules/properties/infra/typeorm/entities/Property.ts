import { v4 as uuidV4 } from 'uuid';

class Property {
  id: string;

  description: string;

  owner_id: string;

  address_id: string;

  iptu_id: string;

  registration_id: string;

  registry_office: string;

  measure_type: string;

  measure_amount: number;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Property };
