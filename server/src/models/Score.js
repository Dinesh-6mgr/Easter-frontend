const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  church: {
    type: String,
    required: [true, 'Church name is required'],
    trim: true,
    minlength: [2, 'Church name must be at least 2 characters'],
    maxlength: [100, 'Church name cannot exceed 100 characters']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Score must be an integer'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
scoreSchema.index({ score: -1, createdAt: -1 });

module.exports = mongoose.model('Score', scoreSchema);