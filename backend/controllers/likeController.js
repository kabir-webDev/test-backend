const Like = require('../models/Like');

const createLike = async (req, res) => {
  try {
    const { blogId, userId } = req.body;
    const like = await Like.create({ blogId, userId });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create like' });
  }
};

module.exports = {
  createLike,
};
