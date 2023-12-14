import { iCreateUserParams, iUser, iUserRepository } from '@/@types/user';
import UserModel from '@/models/User';

export default class UserRepository implements iUserRepository {
  create(params: iCreateUserParams): Promise<iUser> {
    return UserModel.create(params);
  }

  list(): Promise<iUser[]> {
    return UserModel.find().exec();
  }

  findById(id: string): Promise<iUser | null> {
    return UserModel.findById(id).lean().exec();
  }

  findByEmail(email: string): Promise<iUser | null> {
    return UserModel.findOne({
      email
    }).lean().exec();
  }
}
