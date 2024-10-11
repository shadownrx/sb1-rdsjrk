import express from 'express';
import Medal from '../models/Medal.js';
import User from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', adminMiddleware, async (req, res) => {
  try {
    const medal = new Medal(req.body);
    await medal.save();
    res.status(201).json(medal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating medal', error: error.message });
  }
});

router.post('/assign/:userId', adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { medalId } = req.body;
    const user = await User.findById(userId);
    const medal = await Medal.findById(medalId);
    if (!user || !medal) {
      return res.status(404).json({ message: 'User or Medal not found' });
    }
    user.medals.push(medal._id);
    await user.save();
    res.json({ message: 'Medal assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning medal', error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const medals = await Medal.find();
    res.json(medals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medals', error: error.message });
  }
});

export default router;