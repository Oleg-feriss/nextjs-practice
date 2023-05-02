import { MongoClient, InsertOneResult, Sort, WithId } from 'mongodb';

export const connectDatabase = async (): Promise<MongoClient> => {
  return await MongoClient.connect(
    'mongodb+srv://Oleg:tpTKf8SH3Dkwuqgl@cluster0.rukuhqp.mongodb.net/events?retryWrites=true&w=majority'
  );
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: Object
): Promise<InsertOneResult<Document>> => {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter = {}
): Promise<any> => {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};
