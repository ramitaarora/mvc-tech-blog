const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const blogPostData = await Posts.findAll({
        include: [{model: User}],
    });

    const blogPosts = blogPostData.map(post => post.get({plain:true}));
    console.log(blogPosts);

    res.render('homepage', {
        logged_in: true,
        blogPosts,
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;