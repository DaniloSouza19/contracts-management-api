import { createConnection, Connection, getConnectionOptions } from 'typeorm';

export default async (host = 'database', port = 5432): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      port,
    })
  );
};
