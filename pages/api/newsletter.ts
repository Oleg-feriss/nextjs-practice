import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

import { connectDatabase, insertDocument } from '@/helpers/db-util';

interface NewsletterApiRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

const handler = async (
  req: NewsletterApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client!: MongoClient;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
