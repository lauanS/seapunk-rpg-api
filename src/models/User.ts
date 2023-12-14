import { iUser } from '@/@types/user';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema<iUser>({
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  password: { type: 'string', required: true }
}, { versionKey: false });

const User = model<iUser>('user', UserSchema);

export default User;
