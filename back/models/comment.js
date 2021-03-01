//모델 생성
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // MySql에는 users로 적용
        // id: {}, :: mySql에서 자동으로 넣어줌 
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },{
        //두번째 객체는 유저 모델에 대한 셋팅
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //한글저장
    });
    Comment.associate = (db) => {};
    return Comment;
}