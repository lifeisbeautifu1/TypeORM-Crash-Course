import express from 'express';
import 'colors';

import { AppDataSource } from './data-source';
import client from './routes/client';
import banker from './routes/banker';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api/client', client);
app.use('/api/banker', banker);

const start = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, async () => {
      console.log(`App is running on ${PORT}`.green.bold);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
