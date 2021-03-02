const passport = require('passport');
const { User } = require('../models');
const local = require('./local');
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); //유저 정보 중 쿠키와 묶어줄 키값
        //쿠키랑 유저아이디만 서버에서 들고있는다.
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({where:{id}})    
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
        
    });

    local();
};