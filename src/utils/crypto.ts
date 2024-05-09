import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || '';

export type JwtPayload = {
  id: string,
  email: string,
  name: string
}

export const encryptPassword = (plainText: string): Promise<string> => {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};

export const comparePassword = (plainPassword: string, encryptedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, encryptedPassword);
};

export const signJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET);
};
