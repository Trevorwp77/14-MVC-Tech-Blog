// Import the required modules and models
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts for the logged-in user
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id // Find posts with the user ID from the session
        },
        attributes: ['id', 'title', 'content', 'created_at'], // Specify the attributes to include in the response
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], // Include the specified attributes from the Comment model
                include: {
                    model: User,
                    attributes: ['username'], // Include the username attribute from the User model for comments
                },
            },
            {
                model: User,
                attributes: ['username'], // Include the username attribute from the User model
            },
        ],
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true })); // Convert the post data to plain objects
            res.render('dashboard', { posts, loggedIn: true }); // Render the 'dashboard' template with the posts data and loggedIn flag
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to get a single post for editing
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id, // Find the post with the specified ID
        },
        attributes: ['id', 'title', 'content', 'created_at'], // Specify the attributes to include in the response
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], // Include the specified attributes from the Comment model
                include: {
                    model: User,
                    attributes: ['username'], // Include the username attribute from the User model for comments
                },
            },
            {
                model: User,
                attributes: ['username'], // Include the username attribute from the User model
            },
        ],
    })
        .then(dbPostData => {
            if (!dbPostData) {
                // If no post is found with the specified ID, send a 404 status code and a message
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true }); // Convert the post data to a plain object
            res.render('edit-post', { post, loggedIn: true }); // Render the 'edit-post' template with the post data and loggedIn flag
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to render the 'add-post' template for creating a new post
router.get('/new', (req, res) => {
    res.render('add-post', { loggedIn: true }); // Render the 'add-post' template with the loggedIn flag
});

module.exports = router;
