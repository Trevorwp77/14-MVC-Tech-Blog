// Importing necessary parts of the sequelize package
const {
    Model,
    DataTypes
} = require('sequelize');
// Importing the configured instance of Sequelize from the connection configuration file
const sequelize = require('../config/connection');
// Importing bcrypt for password hashing
const bcrypt = require('bcrypt');

// The User class extends Model from Sequelize
class User extends Model {
    // Adding a custom method to our user model 
    // This method will check if the unhashed version of a user's password is the same as the stored hashed version
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initializes the User model's data and configuration, representing a table in the database
User.init({
    id: {
        type: DataTypes.INTEGER, // Uses the INTEGER data type
        allowNull: false, // The column cannot be null
        primaryKey: true, // Sets 'id' as the primary key
        autoIncrement: true // Automatically increment the value of 'id'
    },
    username: {
        type: DataTypes.STRING, // Uses the STRING data type
        allowNull: false // The column cannot be null
    },
    password: {
        type: DataTypes.STRING, // Uses the STRING data type
        allowNull: false, // The column cannot be null
        validate: {
            len: [4] // The length of 'password' must be at least 4
        }
    }
}, {
    hooks: {
        // Before creating a new user, async function will automatically hash their password
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        // Before updating a user, async function will automatically hash their updated password
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize, // Passes the connection instance
    timestamps: false, // Turns off automatic creation of createdAt/updatedAt timestamp fields
    freezeTableName: true, // Makes sure the model name stays as is and is not pluralized
    underscored: true, // Uses underscores instead of camel-casing
    modelName: 'user' // Sets the model name
})

// Export the User model for use in other files
module.exports = User;
