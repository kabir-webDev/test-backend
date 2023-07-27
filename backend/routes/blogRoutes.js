const express = require('express');
const blogController = require('../controllers/blogController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new blog
router.post('/', authMiddleware, blogController.createBlog);

// Search blog
router.get('/search', blogController.searchBlogs);

// Get all blogs
router.get('/', authMiddleware, blogController.getAllBlogs);

// Get all blogs by Owner
router.get('/owner', authMiddleware, blogController.getBlogsByOwner);

// Get a specific blog by ID
router.get('/:id', authMiddleware, blogController.getBlogById);

// Update a blog
router.put('/:id', authMiddleware, blogController.updateBlog);

// Delete a blog
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
