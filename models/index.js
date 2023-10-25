const User = require('./User');
const Posts = require('./Posts');

Posts.belongsTo(User, {
    foreignKey: 'author_id',
});

User.hasMany(Posts, {
    foreignKey: 'author_id',
})

module.exports = { User, Posts };
