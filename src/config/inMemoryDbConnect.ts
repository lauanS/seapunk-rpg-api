import { Connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dbConnect from './dbConnect';

async function inMemoryDbConnect(): Promise<Connection> {
  console.log('\x1b[43m%s\x1b[0m', ' Using InMemoryDb ');

  const mongod = await MongoMemoryServer.create();

  const connection_string = mongod.getUri();

  return dbConnect(connection_string);
}

export default inMemoryDbConnect;
