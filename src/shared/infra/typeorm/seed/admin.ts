import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create(): Promise<void> {
  const connection = await createConnection('localhost', 5433);

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, created_at, updated_at, is_admin)
      VALUES ('${id}','admin', 'admin@dgs.com.br','${password}', now(), now(), true)`
  );

  await connection.close();
}

create().then(() => console.log('Admin User was created!'));
