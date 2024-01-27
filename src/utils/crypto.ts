import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encryptPassword = (plainText: string): Promise<string> => {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};
