import { IRegisterAuthParams } from './auth';

export interface IUser {
  _id: string,
  email: string;
  name: string;
  password: string;
}

interface IUserRepository {
  create(params: IRegisterAuthParams): Promise<IUser>;
  list(): Promise<IUser[]>;
  findById(id: string): Promise<IUser|null>;
  findByEmail(email: string): Promise<IUser|null>;
}
