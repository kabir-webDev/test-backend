const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const { content, blogId, userId } = req.body;
    const comment = await Comment.create({ content, blogId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

module.exports = {
  createComment,
};
