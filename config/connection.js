const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  });
}

module.exports = sequelize;






// // Import the Sequelize constructor from the sequelize package
// const Sequelize = require('sequelize');

// // Import and configure the dotenv package to read environment variables from a .env file
// require('dotenv').config();

// // Declare a variable to hold the Sequelize instance
// let sequelize;

// if (process.env.JAWSDB_URL) { // If there is a JAWSDB_URL environment variable (used in production when deployed on Heroku with JawsDB MySQL)
//     sequelize = new Sequelize(process.env.JAWSDB_URL); // Initialize Sequelize with the JawsDB connection string
// } else { // If there is no JAWSDB_URL environment variable (used in development on local machine)
//     sequelize = new Sequelize( // Initialize Sequelize with the local MySQL database connection parameters
//         process.env.DB_NAME, // Database name
//         process.env.DB_USER, // MySQL username
//         process.env.DB_PW, // MySQL password
//         {
//             host: 'localhost', // Database host
//             dialect: 'mysql', // Database dialect
//             port: 3306 // Database port
//         }
//     );
// }

// module.exports = sequelize; // Export the sequelize instance to be used in other files
