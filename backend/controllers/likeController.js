const Like = require("../models/Like");

const getLikesByBlogId = async (req, res) => {
  try {
    const { blogId } = req.query; 
    const likes = await Like.find({ blogId });

    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};

const createLike = async (req, res) => {
  try {
    const { blogId } = req.query;
    const userId = req.user.userId;

    const existingLike = await Like.findOne({ blogId, userId });
    if (existingLike) {
      return res
        .status(400)
        .json({ error: "User has already liked this blog" });
    }

    const like = await Like.create({ blogId, userId });

    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ error: "Failed to create like" });
  }
};

const unlike = async (req, res) => {
  try {
    const { blogId } = req.query;
    const userId = req.user.userId;

    const result = await Like.findOneAndDelete({ blogId, userId });

    if (!result) {
      return res.status(404).json({ error: "Like not found" });
    }

    res.status(200).json({ message: "Unlike successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike" });
  }
};

module.exports = {
  createLike,
  getLikesByBlogId,
  unlike,
};
