const router = require('express').Router();
const { Posts, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

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
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comment', async (req, res) => {
    try {
        const commentData = await Comments.create({
            comment_content: req.body.comment_content, 
            post_id: req.body.post_id,
            author_id: req.session.user_id,
        })
        res.json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await Posts.findOne( { where: { id: req.params.id }, 
        include: [{model:User}]
        });
        // console.log(blogPostData);
        const blogPost = blogPostData.get({plain: true});
        // console.log(blogPost);

        res.render('editPost', {
            blogPost,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;