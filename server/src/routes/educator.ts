import { Router } from 'express';
import Educator from '../models/Educator';

const router = Router();

// Get all educators
router.get('/', async (req, res) => {
  try {
    const educators = await Educator.find();
    res.json(educators);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch educators' });
  }
});

// Add a new educator
router.post('/', async (req, res) => {
  try {
    const educator = new Educator(req.body);
    await educator.save();
    res.status(201).json(educator);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add educator', details: err });
  }
});

export default router;
