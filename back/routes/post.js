const express = require('express');
const router = express.Router();
const {Post, Image, Comment, User} = require('../models');
const {isLoggedIn} = require('./middlewares')

router.post('/', isLoggedIn, async (req,res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,    //로그인 한번 한후 라우터 접근시 deserializeUser 실행해서 저장한 아이디를 복구해서 req.user 를 만드므로 Id 접근이 가능. 
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }]
        })
        res.status(201).json(fullPost);
    } catch (err) {
        console.error(err)
        next(err)
    }
});

router.post('/:postId/comment', isLoggedIn, async (req,res, next) => {
    try {
        const post = await Post.findOne({
            where: {id: req.params.postId}
        });
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.')
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),  //동적 파라미터  params로 접근 가능
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: {id: comment.id},
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (err) {
        console.error(err)
        next(err)
    }
});


module.exports = router;