const express = require('express');
const Club = require('../models/Club');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Optional authentication middleware for clubs - FIXED to handle malformed tokens
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const jwt = require('jsonwebtoken');
      
      // Check if token exists and is not just whitespace
      if (!token || token.trim() === '') {
        req.user = null;
        return next();
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (req.user && req.user.isBlocked) {
        req.user = null; // Clear user if blocked
      }
    } catch (error) {
      // Silently fail for optional auth - don't crash
      console.log('Optional auth failed:', error.message);
      req.user = null;
    }
  }
  next();
};

// Get all clubs - FIXED: Made authentication optional and added isMember property
router.get('/', optionalAuth, async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate('members', 'name email')
      .populate('events')
      .populate('createdBy', 'name email');
    
    // Add membership info based on authentication
    const clubsWithMembership = clubs.map(club => {
      const clubObj = club.toObject();
      if (req.user) {
        clubObj.isMember = club.members.some(member => 
          member._id.toString() === req.user._id.toString()
        );
      } else {
        clubObj.isMember = false;
      }
      return clubObj;
    });
    
    res.json(clubsWithMembership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single club
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('members', 'name email studentId department')
      .populate('events')
      .populate('createdBy', 'name email');
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    // Add membership info if user is authenticated
    const clubObj = club.toObject();
    if (req.user) {
      clubObj.isMember = club.members.some(member => 
        member._id.toString() === req.user._id.toString()
      );
    } else {
      clubObj.isMember = false;
    }
    
    res.json(clubObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create club
router.post('/', protect, authorize('admin', 'dsw'), upload.single('logo'), async (req, res) => {
  try {
    const clubData = {
      name: req.body.title,        // Map 'title' to 'name'
      category: req.body.club,     // Map 'club' to 'category'
      description: req.body.description,
      logo: req.body.image,
      color: req.body.color || "from-blue-500 to-cyan-500",
      createdBy: req.user._id
    };

    if (req.file) {
      clubData.logo = req.file.path;
    }

    const club = await Club.create(clubData);
    await club.populate('createdBy', 'name email');

    res.status(201).json(club);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update club
router.put('/:id', protect, authorize('admin', 'dsw'), upload.single('logo'), async (req, res) => {
  try {
    let clubData = {
      name: req.body.title,        // Map 'title' to 'name'
      category: req.body.club,     // Map 'club' to 'category'
      description: req.body.description,
      logo: req.body.image,
      color: req.body.color
    };

    if (req.file) {
      clubData.logo = req.file.path;
    }

    const club = await Club.findByIdAndUpdate(
      req.params.id,
      clubData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.json(club);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete club
router.delete('/:id', protect, authorize('admin', 'dsw'), async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: 'Club removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join club - FIXED: Better response structure
router.post('/:id/join', protect, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already a member
    const isAlreadyMember = club.members.some(member => 
      member._id.toString() === req.user._id.toString()
    ) || (user.clubs && user.clubs.some(clubId => 
      clubId.toString() === req.params.id
    ));

    if (isAlreadyMember) {
      return res.status(400).json({ message: 'Already a member of this club' });
    }

    // Add user to club members
    club.members.push(req.user._id);
    await club.save();

    // Add club to user's clubs (initialize if doesn't exist)
    if (!user.clubs) user.clubs = [];
    user.clubs.push(req.params.id);
    await user.save();

    // FIXED: Return proper response structure
    res.json({ 
      message: 'Successfully joined club',
      data: { message: 'Successfully joined club' },
      club: {
        _id: club._id,
        name: club.name,
        isMember: true
      }
    });
  } catch (error) {
    console.error('Join club error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave club - FIXED: Better response structure  
router.post('/:id/leave', protect, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is actually a member
    const isMember = club.members.some(member => 
      member._id.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(400).json({ message: 'You are not a member of this club' });
    }

    // Remove user from club members
    club.members = club.members.filter(
      memberId => memberId.toString() !== req.user._id.toString()
    );
    await club.save();

    // Remove club from user's clubs
    if (user.clubs) {
      user.clubs = user.clubs.filter(
        clubId => clubId.toString() !== req.params.id
      );
      await user.save();
    }

    // FIXED: Return proper response structure
    res.json({ 
      message: 'Successfully left club',
      data: { message: 'Successfully left club' },
      club: {
        _id: club._id,
        name: club.name,
        isMember: false
      }
    });
  } catch (error) {
    console.error('Leave club error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;