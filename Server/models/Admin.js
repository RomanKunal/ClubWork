const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permissions: [{
    type: String,
    enum: ['events', 'clubs', 'students', 'reports']
  }],
  role: {
    type: String,
    enum: ['admin', 'moderator', 'support'],
    default: 'admin'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Admin', adminSchema);