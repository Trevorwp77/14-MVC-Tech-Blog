// Import the required modules and models
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Route to get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password'] // Exclude the password attribute from the response
        }
    })
        .then(dbUserData => res.json(dbUserData)) // Send the user data as a JSON response
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to get a specific user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password'] // Exclude the password attribute from the response
        },
        where: {
            id: req.params.id // Find the user with the specified ID
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at'] // Include the specified attributes from the Post model
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'], // Include the specified attributes from the Comment model
                include: {
                    model: Post,
                    attributes: ['title'] // Include the title attribute from the Post model for comments
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // If no user is found with the specified ID, send a 404 status code and a message
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData); // Send the user data as a JSON response
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            // Save the session data and set the loggedIn flag to true
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData); // Send the new user data as a JSON response
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Send a 500 status code and the error message if an error occurs
        });
});

// Route to handle user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username // Find the user with the specified username
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // If no user is found with the specified username, send a 400 status code and a message
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }

            // Validate the password
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                // If the password is invalid, send a 400 status code and a message
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            // Save the session data and set the loggedIn flag to true
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: dbUserData,
                    message: 'You are now logged in!'
                }); // Send the user data and a success message as a JSON response
            });
        });
});

// Route to handle user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end(); // Send a 204 status code to indicate successful logout
        });
    } else {
        res.status(404).end(); // Send a 404 status code if no session is found
    }
});

module.exports = router;
