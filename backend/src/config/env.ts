import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),

  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT ?? 5432),
  DB_NAME: process.env.DB_NAME ?? 'fut_brazuca_dev',
  DB_USER: process.env.DB_USER ?? 'fut_brazuca',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
};
