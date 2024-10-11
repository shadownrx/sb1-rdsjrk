import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  callsign: { type: String, required: true },
  network: { type: String, enum: ['VATSIM', 'IVAO'], required: true },
  aircraft: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Flight', flightSchema);