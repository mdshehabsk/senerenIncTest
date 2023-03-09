import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user',
  },
});

export class User {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
  ) {}
}
