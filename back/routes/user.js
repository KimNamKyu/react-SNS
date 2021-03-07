const express = require('express');
const bcrypt = require('bcrypt');
const {User, Post, Image, Comment} = require('../models');
const passport = require('passport');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');
const {Op} = require('sequelize');

router.get('/', async (req, res, next) => {
    console.log(req.headers)
    try {
        if(req.user){
            const fullUserWithoutPassword = await User.findOne({
                where: {id: req.user.id},
                attributes: {
                    exclude: ['password']
                },//['id', 'nickname', 'email'],    //제외하고 가져옴.
                include: [{ //관계매핑 가져오기
                    model: Post,
                    attributes: ['id']
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id']
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id']
                }]
            })
            res.status(200).json(fullUserWithoutPassword);    
        }else{
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);   
    }
})

//로그인  미들웨어 확장
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            //서버 에러
            console.log('=======================')
            console.error(err);
            return next(err);  //
        }
        if(info) {
            //클라이언트에러
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: {id: user.id},
                attributes: {
                    exclude: ['password']
                },//['id', 'nickname', 'email'],    //제외하고 가져옴.
                include: [{ //관계매핑 가져오기
                    model: Post,
                    attributes: ['id']
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id']
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id']
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
} )

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})

//회원가입
//async await 순서 문제 해결됨
router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({where: {email: req.body.email, }})  //조건
        if(exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.')  // status 400~ 클라이언트 에러
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //비밀번호 암호화
        await User.create({ // await 하지않으면 비동기로 res.json()이 먼저 실행되기 때문에 
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword
        })
        res.setHeader('Access-Control-Allow-Orgin', 'http://localhost:3000')
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error);    //status 500 서버 에러 express가 에러처리하게
    }
});

//닉네임 수정 patch 부분 수정
router.patch('/nickname', isLoggedIn, async(req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname, //front에서 제공한 
        },{
            where: { id: req.user.id },
        })
        res.status(200).json({nickname: req.body.nickname})
    } catch (error) {
        console.error(error);
        next(error);
    }
})




router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try {
      const user = await User.findOne({ where: { id: req.user.id }});
      if (!user) {
        res.status(403).send('없는 사람을 찾으려고 하시네요?');
      }
      const followers = await user.getFollowers({limit:3,});
      res.status(200).json(followers);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try {
      const user = await User.findOne({ where: { id: req.user.id }});
      if (!user) {
        res.status(403).send('없는 사람을 찾으려고 하시네요?');
      }
      const followings = await user.getFollowings({limit:3,});
      res.status(200).json(followings);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  //팔로우 기능
router.patch('/:userId/follow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});
        if(!user) {
            res.status(403).send('없는 사람을 팔로우하려고 합니다.')
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10)})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

//팔로우 취소
router.delete('/:userId/follow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});
        if(!user) {
            res.status(403).send('없는 사람을 언팔로우하려고 합니다.')
        }
        
        await user.removeFollowers(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10)})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/follower/:userId', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.userId}});
        if(!user) {
            res.status(403).send('없는 사람을 언팔로우하려고 합니다.')
        }
        
        await user.removeFollowings(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10)})
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
    try {
      const where = { UserId: req.params.userId };
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      const posts = await Post.findAll({
        where,
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
            order: [['createdAt', 'DESC']],
          }],
        }, {
          model: User, // 좋아요 누른 사람
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
  });

module.exports = router;