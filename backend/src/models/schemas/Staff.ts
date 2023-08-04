import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Staff {
    providerUserId: string,
    data: string,
    type: number,
    organization: mongoose.ObjectId,
}

// 2. Create a Schema corresponding to the document interface.
const StaffSchema = new Schema<Staff>({
    providerUserId: String, 
    data: String, 
    type: Number, 
    organization: mongoose.Types.ObjectId,
});

// 3. Create a Model.
export default model<Staff>('Staff', StaffSchema);