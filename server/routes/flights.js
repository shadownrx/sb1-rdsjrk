import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import Flight from '../models/Flight.js';

const router = express.Router();

// Get recent flights
router.get('/recent', authMiddleware, async (req, res) => {
  try {
    const recentFlights = await Flight.find()
      .sort({ date: -1 })
      .limit(5)
      .select('date callsign departure arrival aircraft');
    
    res.json(recentFlights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent flights', error: error.message });
  }
});

export default router;