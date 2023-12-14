export interface iUser {
  email: string;
  name: string;
  password: string;
}

interface iUserRepository {
  create(params: iCreateUserParams): Promise<iUser>;
  list(): Promise<iUser[]>;
  findById(id: string): Promise<iUser|null>;
  findByEmail(email: string): Promise<iUser|null>;
}

export interface iCreateUserParams {
  email: string;
  name: string;
  password: string;
}
