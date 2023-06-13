// Import the required modules
const router = require('express').Router();

// Import the routes for users, posts, and comments
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

// Set up the router to use the respective routes for users, posts, and comments
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the router as a module
module.exports = router;
