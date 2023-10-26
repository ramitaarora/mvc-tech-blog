const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const blogPostData = await Posts.findAll({
        include: [{model: User}],
    });

    const blogPosts = blogPostData.map(post => post.get({plain:true}));
    // console.log(blogPosts);

    res.render('homepage', {
        logged_in: req.session.logged_in,
        blogPosts,
    });
});

router.get('/login', (req, res) => {
    if (!req.session.logged_in) {
        res.render('login');
    } else {
        res.redirect('/', {logged_in: req.session.logged_in});
    }
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.logged_in) {
        res.render('login');
    } else {
        const blogPostData = await Posts.findAll({
            include: [{model: User}],
            where: {
                author_id: req.session.user_id
            }
        });
    
        const blogPosts = blogPostData.map(post => post.get({plain:true}));
        console.log(blogPosts);
        res.render('dashboard', {
            logged_in: req.session.logged_in,
            blogPosts,
        });
    }
});

router.get('/newPost', withAuth, (req, res) => {
    res.render('newPost', { logged_in: req.session.logged_in} );
})

module.exports = router;