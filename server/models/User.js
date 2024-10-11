import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  exp: { type: Number, default: 0 },
  medals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medal' }],
  licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  fsairlinesId: { type: String, unique: true },
});

export default mongoose.model('User', userSchema);