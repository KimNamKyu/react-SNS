// const http = require('http') // npm 에서 설치를 안해도 노드가 http를 제공한다.
// const server = http.createServer((req, res) => {
//     res.write('<h1>Hello node<h1>');
//     res.end('hello node')
// })  //자바스크립트 로 코딩 후 app.js실행 시 노드 런타임이 코드를 실행해서 http가 서버 역할을 해줌
const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const cors = require('cors');
const db = require('./models')
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const app = express();

dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3060',
    credentials: true, // 쿠키 전달
}));
//프런트에서 받은 데이터를 해석
app.use('/',express.static(path.join(__dirname, 'uploads')))
app.use(express.json());    //프런트에서 json형식의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({extended: true}));  //form.submit 했을때 처리

//로그인 시 브라우저와 서버가 같은 정보를 가지고있어야함
app.use(cookieParser('nodebirdsecret'));
//session 설정
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,  //쿠키에 랜덤한 키 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('node 서버 실행 중!')
});