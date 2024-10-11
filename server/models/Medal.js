import mongoose from 'mongoose';

const medalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model('Medal', medalSchema);