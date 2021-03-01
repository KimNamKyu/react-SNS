//모델 생성
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { // MySql에는 users로 적용
        // id: {}, :: mySql에서 자동으로 넣어줌 
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    },{
        //두번째 객체는 유저 모델에 대한 셋팅
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글저장
    });
    Image.associate = (db) => {};
    return Image;
}