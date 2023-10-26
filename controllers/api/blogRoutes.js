const router = require('express').Router();
const { Posts, User, Comments } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await Posts.findOne( { where: { id: req.params.id }, 
        include: [{model:User}]
        });
        // console.log(blogPostData);
        const blogPost = blogPostData.get({plain: true});
        // console.log(blogPost);

        const commentData = await Comments.findAll( { where: { post_id: req.params.id},
            include: [{model: User}]
        })
        const comments = commentData.map((comment => comment.get({plain:true})));
        // console.log(comments);

        res.render('post', {
            blogPost,
            comments,
            logged_in: true,
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;