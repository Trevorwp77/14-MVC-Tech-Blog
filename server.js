// Import necessary dependencies
const path = require('path');
const express = require('express'); // For creating the server
const routes = require('./controllers'); // Custom routes
const sequelize = require('./config/connection'); // Sequelize database connection
const helpers = require('./utils/helpers'); // Handlebars helpers
const exphbs = require('express-handlebars'); // Handlebars view engine
const session = require('express-session'); // For handling user sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store); // To store session data in Sequelize

// Create handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

// Define session object
const sess = {
    secret: process.env.DB_SECRET, // Secret used to sign the session ID cookie
    cookie: {}, // Settings for the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    store: new SequelizeStore({ // Store sessions in Sequelize
        db: sequelize, // Use Sequelize as store
        checkExpirationInterval: 1000 * 60 * 10, // Check expired sessions every 10 minutes
        expiration: 1000 * 60 * 30 // Sessions will expire after 30 minutes
    })
};

// Create express application
const app = express();
const PORT = process.env.PORT || 3001; // Listen on environment defined port or default to 3001

// Set handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middlewares
app.use(session(sess)); // Use session middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(routes); // Use custom routes

// Sync Sequelize models to the database
sequelize.sync();

// Start server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
