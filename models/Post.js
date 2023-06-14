// Importing necessary parts of the sequelize package
const {
    Model,
    DataTypes
} = require('sequelize');
// Importing the configured instance of Sequelize from the connection configuration file
const sequelize = require('../config/connection');

// The Post class extends Model from Sequelize
class Post extends Model {}

// Initializes the Post model's data and configuration, representing a table in the database
Post.init({
    id: {
        type: DataTypes.INTEGER, // Uses the INTEGER data type
        allowNull: false, // The column cannot be null
        primaryKey: true, // Sets 'id' as the primary key
        autoIncrement: true // Automatically increment the value of 'id'
    },
    title: {
        type: DataTypes.STRING, // Uses the STRING data type
        allowNull: false, // The column cannot be null
        validate: {
            len: [1] // The length of 'title' must be at least 1
        }
    },
    content: {
        type: DataTypes.STRING, // Uses the STRING data type
        allowNull: false, // The column cannot be null
        validate: {
            len: [1] // The length of 'content' must be at least 1
        }
    },
    user_id: {
        type: DataTypes.INTEGER, // Uses the INTEGER data type
        references: {
            model: 'user', // Establishes a foreign key relationship with the 'user' table
            key: 'id' // The 'user_id' is connected to the 'id' in the 'user' table
        }
    }
}, {
    sequelize, // Passes the connection instance
    freezeTableName: true, // Makes sure the model name stays as is and is not pluralized
    underscored: true, // Uses underscores instead of camel-casing
    modelName: 'post' // Sets the model name
})

// Export the Post model for use in other files
module.exports = Post;
