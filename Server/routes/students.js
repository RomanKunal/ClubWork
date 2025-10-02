const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get student profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('savedEvents')
      .populate('appliedEvents.event')
      .populate('eventsRegistered');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student's applied events
router.get('/applied-events', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('appliedEvents.event');

    res.json(user.appliedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student's saved events
router.get('/saved-events', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('savedEvents');

    res.json(user.savedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student's registered events
router.get('/registered-events', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('eventsRegistered');

    res.json(user.eventsRegistered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;