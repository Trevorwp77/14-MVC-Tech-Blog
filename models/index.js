// Importing User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User-Post relationship
// A user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id' // foreignKey represents which user created the post
})

// User-Comment relationship
// A user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id' // foreignKey represents which user created the comment
})

// Post-User relationship
// Each post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id' // foreignKey represents which user created the post
})

// Post-Comment relationship
// A post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id' // foreignKey represents the post to which the comment belongs
})

// Comment-User relationship
// Each comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id' // foreignKey represents which user created the comment
})

// Comment-Post relationship
// Each comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id' // foreignKey represents the post to which the comment belongs
})

// Exporting the User, Post and Comment models to be used in other parts of the application
module.exports = {
    User,
    Post,
    Comment
};
