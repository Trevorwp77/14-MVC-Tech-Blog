// Import the required modules and models
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Route to get all posts for the homepage
router.get('/', (req, res) => {
    Post.findAll({
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
            res.render('homepage', { posts, loggedIn: req.session.loggedIn }); // Render the 'homepage' template with the posts data and loggedIn flag
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to get a single post by ID
router.get('/post/:id', (req, res) => {
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
            res.render('single-post', { post, loggedIn: req.session.loggedIn }); // Render the 'single-post' template with the post data and loggedIn flag
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/'); // If the user is already logged in, redirect to the homepage
        return;
    }

    res.render('login'); // Render the 'login' template
});

// Route to render the signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/'); // If the user is already logged in, redirect to the homepage
        return;
    }

    res.render('signup'); // Render the 'signup' template
});

// Route to handle 404 errors
router.get('*', (req, res) => {
    res.status(404).send("Can't go there!"); // Send a 404 status code and a message for any unmatched route
});

module.exports = router;
