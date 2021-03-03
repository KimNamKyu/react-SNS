//limit offset 방식 => 실무에서는 잘쓰지않는데
// => 치명적인단점 중간에 사람이 게시물을 추가하거나 제거시
const express = require('express');
const router = express.Router();
const { Post, Image, User, Comment } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        console.log('posts')
        const posts = await Post.findAll({
            // where: { id: lastId },
            limit: 10,
            // offset: 0, //0 :: 1~10  10: 11~20 offset => lastid
            order: [
                ['createdAt', 'DESC'],  //게시물 생서일
                [Comment, 'createdAt', 'DESC']  //댓글 생성일
            ],     // 최근것 부터 가져와야함
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            }, {
                model: Image
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }],
        });
        res.status(200).json(posts);    
    } catch (error) {
        console.error(error);
        next(error);
    }
    
})
module.exports = router;