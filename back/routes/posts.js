//limit offset 방식 => 실무에서는 잘쓰지않는데
// => 치명적인단점 중간에 사람이 게시물을 추가하거나 제거시
const express = require('express');
const {Op} = require('sequelize');
const router = express.Router();
const { Post, Image, User, Comment } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const where = {}
        if (parseInt(req.query.lastId, 10)) {   //초기 로딩이 아닐때
            where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}    //id가 라스트아이디보다 작은걸로 10개 불러옴
        }
        const posts = await Post.findAll({
            where,
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
            },{
                model: User,    //좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }, {
                  model: Image,
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