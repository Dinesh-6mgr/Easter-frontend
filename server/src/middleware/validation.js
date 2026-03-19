const validateScoreInput = (req, res, next) => {
  const { name, church, score } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!church || church.trim().length < 2) {
    errors.push('Church must be at least 2 characters');
  }

  if (!score || typeof score !== 'number' || score < 0) {
    errors.push('Valid score is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

module.exports = {
  validateScoreInput
};