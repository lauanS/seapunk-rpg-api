import { IUser } from '@/@types/user';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema<IUser>({
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  password: { type: 'string', required: true }
}, { versionKey: false });

const User = model<IUser>('user', UserSchema);

export default User;
