import { v4 as uuidV4 } from 'uuid';

class User {
  id: string;

  name: string;

  email: string;

  is_admin: boolean;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.is_admin = false;
    }
  }
}

export { User };
