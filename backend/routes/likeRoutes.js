const express = require('express');
const likeController = require('../controllers/likeController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken,  likeController.getLikesByBlogId);
router.post('/', authenticateToken,  likeController.createLike);
router.delete('/', authenticateToken, likeController.unlike);

module.exports = router;
