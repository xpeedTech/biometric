import { Schema, model } from 'mongoose';
import User from './User';

// 1. Create an interface representing a document in MongoDB.
interface IAdmin {
  name: string;
  email: string;
  username: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, {
  discriminatorKey: 'role'
});

// 3. Create a Model.
export default User.discriminator<IAdmin>('Admin', userSchema);