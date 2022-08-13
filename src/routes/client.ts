import express from 'express';
import { createQueryBuilder } from 'typeorm';

import { Client } from '../entities/client';
import { Transaction, TransactionTypes } from '../entities/transaction';

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, balance, cardNumber } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    card_number: cardNumber,
    email,
    balance,
  });

  await client.save();

  res.json(client);
});

router.get('/', async (req, res) => {
  const clients = await Client.find();

  return res.json(clients);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await Client.delete({ id });

  res.json(response);
});

router.post('/:id/transaction', async (req, res) => {
  const { id } = req.params;

  const { amount, type } = req.body;

  const client = await Client.findOneBy({ id });

  if (!client) {
    return res.json({ message: 'Client not found' });
  } else {
    const transaction = Transaction.create({
      amount: +amount,
      type,
      client,
    });

    await transaction.save();

    if (type === TransactionTypes.DEPOSIT) {
      client.balance = client.balance + +amount;
      client.transactions = [transaction];
    } else if (type === TransactionTypes.WITHDRAW) {
      client.balance = client.balance - +amount;
      client.transactions = [transaction];
    }

    await client.save();

    res.json(client);
  }
});

export default router;
