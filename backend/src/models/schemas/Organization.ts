import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Organization {
  providerOrgId: string,
  webhookURL: string,
}

// 2. Create a Schema corresponding to the document interface.
const OrganizationSchema = new Schema<Organization>({
  providerOrgId: String, 
  webhookURL: String, 
});

// 3. Create a Model.
export default model<Organization>('Organization', OrganizationSchema);