const router = require('express').Router();
const { Posts, User } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await Posts.findOne( { where: { id: req.params.id }, 
        include: [{model:User}]});
        // console.log(blogPostData);
        const blogPost = blogPostData.get({plain: true});
        console.log(blogPost);

        res.render('post', {
            blogPost,
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;