// Define a middleware function to check if a user is authenticated
const withAuth = (req, res, next) => {
    if (!req.session.user_id) { // If there is no user_id in the session object of the request
        res.redirect('/login'); // Redirect the user to the login page
    } else { // If there is a user_id in the session object
        next(); // Continue to the next middleware function or route handler
    }
};

module.exports = withAuth; // Export the withAuth function so it can be used in other files
