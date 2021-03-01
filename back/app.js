// const http = require('http') // npm 에서 설치를 안해도 노드가 http를 제공한다.
// const server = http.createServer((req, res) => {
//     res.write('<h1>Hello node<h1>');
//     res.end('hello node')
// })  //자바스크립트 로 코딩 후 app.js실행 시 노드 런타임이 코드를 실행해서 http가 서버 역할을 해줌
const express = require('express');
const postRouter = require('./routes/post');

const app = express();
app.get('/', (req,res) => {
    res.send('hello express');
});

app.delete('/', (req,res) => {
    res.json([
        {id: 1},
    ])
});

app.use('/post/', postRouter);
app.listen(3065, () => {
    console.log('node 서버 실행 중')
});