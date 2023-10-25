const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

Posts.belongsTo(User, {
    foreignKey: 'author_id',
});

User.hasMany(Posts, {
    foreignKey: 'author_id',
})

Comments.belongsTo(User, {
    foreignKey: 'author_id',
})

User.hasMany(Comments, {
    foreignKey: 'author_id',
})

module.exports = { User, Posts, Comments };
