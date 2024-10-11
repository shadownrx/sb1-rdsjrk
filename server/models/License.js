import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
});

export default mongoose.model('License', licenseSchema);