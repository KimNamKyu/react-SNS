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
                    model: User,    //댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,    //게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User,    //좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
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

//좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        console.log(req.params.postId + '>>>>>>>>>>>>>>>>>>>>')
        const post = await Post.findOne({where: {id: req.params.postId}})    
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        //관계메서드
        await post.addLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id})
    } catch (error) {
        console.error(err)
        next(err)
    }
    
})

//좋아요 취소
router.delete('/:postId/like',isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.postId}})    
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id})
    } catch (error) {
        console.error(err)
        next(err)
    }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({
            where: { 
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId) })
    } catch (error) {
        console.error(err);
        next(err);
    }
})
module.exports = router;