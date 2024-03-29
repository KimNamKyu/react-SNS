//모델 생성
module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { // MySql에는 users로 적용
        // id: {}, :: mySql에서 자동으로 넣어줌 
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        // belongsToMany(다대다 관계)
        // 중간테이블 메핑테이블이 생성되어 검색(조회)
    },{
        //두번째 객체는 유저 모델에 대한 셋팅
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //한글저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'})
    };
    return Hashtag;
}