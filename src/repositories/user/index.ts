import { ICreateUserParams, IUser, IUserRepository } from '@/@types/user';
import UserModel from '@/models/User';

export default class UserRepository implements IUserRepository {
  create(params: ICreateUserParams): Promise<IUser> {
    return UserModel.create(params);
  }

  list(): Promise<IUser[]> {
    return UserModel.find().exec();
  }

  findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean().exec();
  }

  findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({
      email
    }).lean().exec();
  }
}
