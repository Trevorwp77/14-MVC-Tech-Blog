// Import the required modules and models
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'], // Specify the attributes to include in the response
        order: [['created_at', 'DESC']], // Sort the posts in descending order of creation date
        include: [
            {
                model: User,
                attributes: ['username'], // Include the username attribute from the User model
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], // Include the specified attributes from the Comment model
                include: {
                    model: User,
                    attributes: ['username'], // Include the username attribute from the User model for comments
                },
            },
        ],
    })
        .then((dbPostData) => res.json(dbPostData)) // Send the post data as a JSON response
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to get a single post by ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id, // Find the post with the specified ID
        },
        attributes: ['id', 'content', 'title', 'created_at'], // Specify the attributes to include in the response
        include: [
            {
                model: User,
                attributes: ['username'], // Include the username attribute from the User model
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], // Include the specified attributes from the Comment model
                include: {
                    model: User,
                    attributes: ['username'], // Include the username attribute from the User model for comments
                },
            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                // If no post is found with the specified ID, send a 404 status code and a message
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData); // Send the post data as a JSON response
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to create a new post
router.post('/', withAuth, (req, res) => {
    console.log('creating');
    Post.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id, // Associate the post with the authenticated user's ID
    })
        .then((dbPostData) => res.json(dbPostData)) // Send the new post data as a JSON response
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to update a post by ID
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.post_content,
        },
        {
            where: {
                id: req.params.id, // Find the post with the specified ID
            },
        }
    )
        .then((dbPostData) => {
            if (!dbPostData[0]) {
                // If no post is found with the specified ID, send a 404 status code and a message
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData); // Send the updated post data as a JSON response
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to delete a post by ID
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id, // Find the post with the specified ID
        },
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                // If no post is found with the specified ID, send a 404 status code and a message
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData); // Send the deleted post data as a JSON response
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

module.exports = router;
