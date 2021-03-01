//모델 생성
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { 
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
    Post.associate = (db) => {};
    return Post;
}