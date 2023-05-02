import type { NextApiRequest, NextApiResponse } from 'next';
import { InsertOneResult } from 'mongodb';

import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '@/helpers/db-util';

interface CommentApiRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
    text: string;
  };
  query: {
    eventId: string;
  };
}

const handler = async (
  req: CommentApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { eventId } = req.query;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid  input.' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result!: InsertOneResult<Document>;

    try {
      result = await insertDocument(client, 'comments', newComment);
      const _id = result.insertedId;

      res
        .status(201)
        .json({ message: 'Added comment.', comment: { _id, ...newComment } });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
};

export default handler;
