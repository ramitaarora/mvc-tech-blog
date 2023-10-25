const router = require('express').Router();
const { } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const blogPostData = await Posts.findAll({
        include: [{model: User}],
    });
    res.json(blogPostData);

    // res.render('homepage', {
    //     logged_in: req.session.logged_in,
    //     blogPosts
    // });
});

module.exports = router;