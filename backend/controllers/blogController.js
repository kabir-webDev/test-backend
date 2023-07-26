const Blog = require('../models/Blog');

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const ownerId = req.userId; 
    const blog = await Blog.create({ title, content, category, tags, ownerId });
    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// Search blogs by title or content
const searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(blogs.length ? blogs : 'No Blogs Match Found!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to search blogs' });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('ownerId', 'username email');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
};

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate('ownerId', 'username email');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog' });
  }
};

// Get all blogs by owner
const getBlogsByOwner = async (req, res) => {
  try {
    const ownerId = req.userId;
    const blogs = await Blog.find({ ownerId }).populate('ownerId', 'username email');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, category, tags } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, category, tags },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

module.exports = {
  createBlog,
  searchBlogs,
  getAllBlogs,
  getBlogsByOwner,
  getBlogById,
  updateBlog,
  deleteBlog,
};
