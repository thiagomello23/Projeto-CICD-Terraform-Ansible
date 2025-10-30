
import { DataSource } from 'typeorm';
import "dotenv/config";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        // @ts-ignore
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [],
        synchronize: !!process.env.DB_SYNC,
      });

      return dataSource.initialize();
    },
  },
];
