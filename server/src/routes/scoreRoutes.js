const express = require('express');
const { body } = require('express-validator');
const {
  saveScore,
  getTopScores,
  getUserRank
} = require('../controllers/scoreController');

const router = express.Router();

// Validation rules
const validateScore = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('church')
    .trim()
    .notEmpty().withMessage('Church name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Church must be between 2 and 100 characters'),
  
  body('score')
    .isInt({ min: 0 }).withMessage('Score must be a positive integer')
    .custom((value) => {
      if (value < 50) {
        throw new Error('Score must be at least 50 to submit');
      }
      return true;
    })
];

// Routes
router.route('/')
  .get(getTopScores)
  .post(validateScore, saveScore);

router.get('/rank/:score', getUserRank);

module.exports = router;    