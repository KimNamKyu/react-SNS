// const http = require('http') // npm 에서 설치를 안해도 노드가 http를 제공한다.
// const server = http.createServer((req, res) => {
//     res.write('<h1>Hello node<h1>');
//     res.end('hello node')
// })  //자바스크립트 로 코딩 후 app.js실행 시 노드 런타임이 코드를 실행해서 http가 서버 역할을 해줌
const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const cors = require('cors');
const db = require('./models')
const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.error);

app.use(cors({
    orgin: '*',
    credentials: false, //나중에 true
}));
//프런트에서 받은 데이터를 해석
app.use(express.json());    //프런트에서 json형식의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({extended: true}));  //form.submit 했을때 처리

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('node 서버 실행 중!')
});