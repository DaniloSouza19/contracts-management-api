import { createConnection, Connection, getConnectionOptions } from 'typeorm';

export default async (host = 'database', port = 5432): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      port: process.env.NODE_ENV === 'test' ? 5433 : port,
      database:
        process.env.NODE_ENV === 'test'
          ? 'contracts_test'
          : defaultOptions.database,
    })
  );
};
