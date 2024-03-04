import mongoose from 'mongoose';

export const clearDb = () => {
  return mongoose.connection.dropDatabase();
};
