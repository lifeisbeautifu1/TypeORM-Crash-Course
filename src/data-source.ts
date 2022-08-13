import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Banker } from './entities/banker';
import { Client } from './entities/client';
import { Transaction } from './entities/transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'harry',
  password: '89179645957',
  database: 'harry',
  synchronize: true,
  logging: true,
  entities: [Client, Banker, Transaction],
  migrations: [],
  subscribers: [],
});
