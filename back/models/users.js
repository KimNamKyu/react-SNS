const { unique } = require("faker");

//모델 생성
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySql에는 users로 적용
        // id: {}, :: mySql에서 자동으로 넣어줌 
        email: {
            //컬럼에대한 설명
            type: DataTypes.STRING(30),
            allowNull: false, //필수값 적용 false필수 true not null
            unique: true, //고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),    //암호화 하기 때문
            allowNull: false
        },
    },{
        //두번째 객체는 유저 모델에 대한 셋팅
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글저장
    });
    User.associate = (db) => {};
    return User;
}