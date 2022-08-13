import express from 'express';

import { Banker } from '../entities/banker';
import { Client } from '../entities/client';

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, employeeNumber, cardNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    card_number: cardNumber,
    employee_number: employeeNumber,
    email,
  });

  await banker.save();

  res.json(banker);
});



router.patch('/:bankerId/client/:clientId', async (req, res) => {
  const { bankerId, clientId } = req.body;

  const client = await Client.findOneBy({ id: clientId });

  const banker = await Banker.findOneBy({ id: bankerId });

  if (banker && client) {
    banker.clients = [client];
    await banker.save();
    return res.json({ message: 'Banker connected to client' });
  } else {
    return res.status(404).json({ message: 'Banker or client not found' });
  }
});

export default router;
