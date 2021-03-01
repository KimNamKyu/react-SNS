const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models');
const router = express.Router();

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
        next(error);    //status 500 서버 에러
    }
});

module.exports = router;