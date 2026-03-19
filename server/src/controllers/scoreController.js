const Score = require('../models/Score');
const { validationResult } = require('express-validator');

// @desc    Save a new score
// @route   POST /api/scores
// @access  Public
const saveScore = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, church, score } = req.body;

    // Create new score entry
    const newScore = await Score.create({
      name: name.trim(),
      church: church.trim(),
      score
    });

    res.status(201).json({
      success: true,
      data: newScore,
      message: 'Score saved successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get top 20 scores
// @route   GET /api/scores
// @access  Public
const getTopScores = async (req, res, next) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1, createdAt: -1 })
      .limit(20)
      .select('name church score createdAt');

    res.status(200).json({
      success: true,
      count: scores.length,
      data: scores
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's rank (optional feature)
// @route   GET /api/scores/rank/:score
// @access  Public
const getUserRank = async (req, res, next) => {
  try {
    const { score } = req.params;
    
    const higherScores = await Score.countDocuments({
      score: { $gt: parseInt(score) }
    });

    const rank = higherScores + 1;

    res.status(200).json({
      success: true,
      rank
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveScore,
  getTopScores,
  getUserRank
};