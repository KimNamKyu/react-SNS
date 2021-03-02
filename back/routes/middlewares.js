//로그인 여부 검사 미들웨어 
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next(); //그냥 next시 다음미들웨어로 이동
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next(); //그냥 next시 다음미들웨어로 이동
    } else {
        res.status(401).send('로그인 하지 않은 사용자입니다.');
    }
}