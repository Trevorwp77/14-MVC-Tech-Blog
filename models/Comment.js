// Importing necessary parts of the sequelize package
const {
    Model,
    DataTypes
} = require('sequelize');
// Importing the configured instance of Sequelize from the connection configuration file
const sequelize = require('../config/connection');

// The Comment class extends Model from Sequelize
class Comment extends Model {}

// Initializes the Comment model's data and configuration, representing a table in the database
Comment.init({
    id: {
        type: DataTypes.INTEGER, // Uses the INTEGER data type
        allowNull: false, // The column cannot be null
        primaryKey: true, // Sets 'id' as the primary key
        autoIncrement: true // Automatically increment the value of 'id'
    },
    comment_text: {
        type: DataTypes.STRING, // Uses the STRING data type
        allowNull: false, // The column cannot be null
        validate: {
            len: [1] // The length of 'comment_text' must be at least 1
        }
    },
    user_id: {
        type: DataTypes.INTEGER, // Uses the INTEGER data type
        allowNull: false, // The column cannot be null
        references: {
            model: 'user', // Establishes a foreign key relationship with the 'user' table
            key: 'id' // The 'user_id' is connected to the 'id' in the 'user' table
        }
    },
    post_id: {
        type: DataTypes.INTEGER, // Uses the INTEGER data type
        allowNull: false, // The column cannot be null
        references: {
            model: 'post', // Establishes a foreign key relationship with the 'post' table
            key: 'id' // The 'post_id' is connected to the 'id' in the 'post' table
        }
    }
}, {
    sequelize, // Passes the connection instance
    freezeTableName: true, // Makes sure the model name stays as is and is not pluralized
    underscored: true, // Uses underscores instead of camel-casing
    modelName: 'comment' // Sets the model name
})

// Export the Comment model for use in other files
module.exports = Comment;
