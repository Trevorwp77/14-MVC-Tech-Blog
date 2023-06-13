// Import the required modules and routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Route middleware for '/api' routes
router.use('/api', apiRoutes);

// Route middleware for '/dashboard' routes
router.use('/dashboard', dashboardRoutes);

// Route middleware for '/' (homepage) routes
router.use('/', homeRoutes);

// Route to handle 404 errors
router.use((req, res) => {
    res.status(404).end(); // Send a 404 status code for any unmatched route
});

module.exports = router;
