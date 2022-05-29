import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

const HOST = process.env.NODE_ENV === 'production' ? 'database' : 'localhost';
const PORT = process.env.NODE_ENV === 'production' ? 5432 : 5433;

async function create(): Promise<void> {
  const connection = await createConnection(HOST, PORT);

  const id = uuidV4();
  const password = await hash('admin', 8);

  try {
    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at, is_admin)
        VALUES ('${id}','admin', 'admin@dgs.com.br','${password}', now(), now(), true)`
    );
  } catch (error) {
    console.log(error);
  } finally {
    try {
      await connection.close();
    } catch (error) {
      console.log(error);
    }
  }
}

create().then(() => console.log('The Script was finished'));
