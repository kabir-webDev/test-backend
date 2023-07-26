const Rating = require('../models/Rating');

const createRating = async (req, res) => {
  try {
    const { value, blogId, userId } = req.body;
    const rating = await Rating.create({ value, blogId, userId });
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rating' });
  }
};

module.exports = {
  createRating,
};
