const express = require('express');
const bcrypt = require('bcrypt');
const {User, Post} = require('../models');
const passport = require('passport');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares')

router.get('/', async (req, res, next) => {
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



module.exports = router;