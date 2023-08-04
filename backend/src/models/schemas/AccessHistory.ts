import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface AccessHistory {
  staffId: mongoose.ObjectId,
  deviceId: mongoose.ObjectId,
  organizationId: mongoose.ObjectId,
  providerUserId: mongoose.ObjectId,
  timestamp: Date,
}

// 2. Create a Schema corresponding to the document interface.
const AccessHistorySchema = new Schema<AccessHistory>({
  staffId: mongoose.Types.ObjectId,
  deviceId: mongoose.Types.ObjectId,
  organizationId: mongoose.Types.ObjectId,
  providerUserId: mongoose.Types.ObjectId,
  timestamp: Date,
});

// 3. Create a Model.
export default model<AccessHistory>('AccessHistory', AccessHistorySchema);