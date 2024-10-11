import express from 'express';
import License from '../models/License.js';
import User from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', adminMiddleware, async (req, res) => {
  try {
    const license = new License(req.body);
    await license.save();
    res.status(201).json(license);
  } catch (error) {
    res.status(500).json({ message: 'Error creating license', error: error.message });
  }
});

router.post('/assign/:userId', adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { licenseId } = req.body;
    const user = await User.findById(userId);
    const license = await License.findById(licenseId);
    if (!user || !license) {
      return res.status(404).json({ message: 'User or License not found' });
    }
    user.licenses.push(license._id);
    await user.save();
    res.json({ message: 'License assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning license', error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching licenses', error: error.message });
  }
});

export default router;