import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({ id, name, email, is_admin, created_at, updated_at }: User) {
    return {
      id,
      name,
      email,
      is_admin,
      created_at,
      updated_at,
    };
  }
}

export { UserMap };
