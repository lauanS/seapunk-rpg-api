export interface IUser {
  email: string;
  name: string;
  password: string;
}

interface IUserRepository {
  create(params: ICreateUserParams): Promise<IUser>;
  list(): Promise<IUser[]>;
  findById(id: string): Promise<IUser|null>;
  findByEmail(email: string): Promise<IUser|null>;
}

export interface ICreateUserParams {
  email: string;
  name: string;
  password: string;
}
