import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Device {
  organizationId: mongoose.ObjectId,
}

// 2. Create a Schema corresponding to the document interface.
const DeviceSchema = new Schema<Device>({
  organizationId: mongoose.Types.ObjectId,
});

// 3. Create a Model.
export default model<Device>('Device', DeviceSchema);