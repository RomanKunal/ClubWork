const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { club: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const events = await Event.find(query)
      .populate('interested', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('interested', 'name email')
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event
router.post('/', protect, authorize('admin', 'dsw'), upload.single('image'), async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id
    };

    if (req.file) {
      eventData.image = req.file.path;
    }

    const event = await Event.create(eventData);
    await event.populate('createdBy', 'name email');

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id', protect, authorize('admin', 'dsw'), upload.single('image'), async (req, res) => {
  try {
    let eventData = { ...req.body };

    if (req.file) {
      eventData.image = req.file.path;
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
router.delete('/:id', protect, authorize('admin', 'dsw'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for event
router.post('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const alreadyRegistered = user.appliedEvents.some(
      applied => applied.event.toString() === req.params.id
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Add to user's applied events
    user.appliedEvents.push({
      event: req.params.id,
      status: 'pending'
    });

    // Add to user's eventsRegistered (if not already there)
    if (!user.eventsRegistered.includes(req.params.id)) {
      user.eventsRegistered.push(req.params.id);
    }

    // Add to event's interested
    if (!event.interested.includes(req.user._id)) {
      event.interested.push(req.user._id);
    }

    await user.save();
    await event.save();

    // Populate the response with event details
    await user.populate('appliedEvents.event');
    await user.populate('eventsRegistered');

    res.json({ 
      message: 'Successfully registered for event',
      user: {
        eventsRegistered: user.eventsRegistered,
        appliedEvents: user.appliedEvents
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/bookmark event - FIXED: This was missing
router.post('/:id/save', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Initialize savedEvents if it doesn't exist
    if (!user.savedEvents) {
      user.savedEvents = [];
    }

    // Check if already saved
    const alreadySaved = user.savedEvents.includes(req.params.id);

    if (alreadySaved) {
      // Remove from saved events (unsave)
      user.savedEvents = user.savedEvents.filter(
        eventId => eventId.toString() !== req.params.id
      );
      await user.save();
      return res.json({ message: 'Event removed from saved', isSaved: false });
    } else {
      // Add to saved events
      user.savedEvents.push(req.params.id);
      await user.save();
      return res.json({ message: 'Event saved successfully', isSaved: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;