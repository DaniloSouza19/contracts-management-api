import { v4 as uuidV4 } from 'uuid';

class Contract {
  id: string;

  description: string;

  contractor_id: string;

  customer_id: string;

  property_id: string;

  price: number;

  start_date: Date;

  end_date: Date;

  registration_id: string;

  registry_office: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Contract };
