const User = require('./User');
const Posts = require('./Posts');

Posts.belongsTo(User, {
    foreignKey: 'author_id',
});

// User.hasMany(Posts, {
//     foreignKey: 'id',
// })

module.exports = { User, Posts };
