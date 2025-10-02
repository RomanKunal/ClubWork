const express = require('express');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all admins
router.get('/admins', protect, authorize('admin', 'dsw'), async (req, res) => {
  try {
    const admins = await Admin.find()
      .populate('user', 'name email')
      .populate('addedBy', 'name email');

    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create admin
router.post('/admins', protect, authorize('dsw'), async (req, res) => {
  try {
    const { userId, permissions, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already an admin
    const existingAdmin = await Admin.findOne({ user: userId });
    if (existingAdmin) {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    const admin = await Admin.create({
      user: userId,
      permissions,
      role,
      addedBy: req.user._id
    });

    // Update user role
    user.role = 'admin';
    await user.save();

    await admin.populate('user', 'name email');
    await admin.populate('addedBy', 'name email');

    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admin
router.put('/admins/:id', protect, authorize('dsw'), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('addedBy', 'name email');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin
router.delete('/admins/:id', protect, authorize('dsw'), async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update user role back to student
    await User.findByIdAndUpdate(admin.user, { role: 'student' });

    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students - FIXED: Added proper pagination and search functionality
router.get('/students', protect, authorize('admin', 'dsw'), async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    let query = { role: 'student' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'all') {
      query.isBlocked = status === 'blocked';
    }

    const students = await User.find(query)
      .select('-password')
      .populate('appliedEvents.event', 'title')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Transform the data to match dashboard expectations
    const transformedStudents = students.map(student => {
      const studentObj = student.toObject();
      // Add eventsRegistered count if appliedEvents exists
      studentObj.eventsRegistered = student.appliedEvents ? student.appliedEvents.length : 0;
      return studentObj;
    });

    const total = await User.countDocuments(query);

    res.json({
      students: transformedStudents,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Block student
router.put('/students/:id/block', protect, authorize('admin', 'dsw'), async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unblock student
router.put('/students/:id/unblock', protect, authorize('admin', 'dsw'), async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete student
router.delete('/students/:id', protect, authorize('dsw'), async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;