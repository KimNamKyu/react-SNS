const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); //file system
const router = express.Router();
const {Post, Image, Comment, User, Hashtag} = require('../models');
const {isLoggedIn} = require('./middlewares');

try {
    fs.accessSync('uploads');    
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다. ')
    fs.mkdirSync('uploads');
}

//multer는 라우터마다
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            // 컴퓨터 하드에 저장 => 이후 aws s3 
            done(null, 'uploads')
        },
        filename(req, file, done) {     //test.png
            const ext = path.extname(file.originalname);    //확장자 추출(.png)
            const basename = path.basename(file.originalname, ext);     //test
            done(null, basename + '_' + new Date().getTime() + ext);
        },
    }),//어디에 저장? 
    limits: {fileSize: 20 * 1024 * 1024}, //20MB
})
//upload.array 여러장  single 하나  none (json)

router.post('/', isLoggedIn, upload.none(),async (req,res, next) => {
    try {
        console.log(req.user)
        const hashtags = req.body.content.match(/#[^\s#]+/g)
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,    //로그인 한번 한후 라우터 접근시 deserializeUser 실행해서 저장한 아이디를 복구해서 req.user 를 만드므로 Id 접근이 가능. 
        });
        if(hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: {name: tag.slice(1).toLowerCase() },
            })))
            await post.addHashtags(result.map((v) => v[0]));
        }
        if(req.body.image){
            if(Array.isArray(req.body.image)) { //여러개는 배열로
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image})))
                await post.addImages(images)
            } else {    //이미지 하나 image: test.png
                const images = await Image.create({src: req.body.image})
                await post.addImages(images)
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,    //댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,    //게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User,    //좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }]
        })
        res.status(201).json(fullPost);
    } catch (err) {
        console.error(err)
        next(err)
    }
});

router.post('/:postId/comment', isLoggedIn, async (req,res, next) => {
    try {
        const post = await Post.findOne({
            where: {id: req.params.postId}
        });
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.')
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),  //동적 파라미터  params로 접근 가능
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: {id: comment.id},
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (err) {
        console.error(err)
        next(err)
    }
});

//좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        console.log(req.params.postId + '>>>>>>>>>>>>>>>>>>>>')
        const post = await Post.findOne({where: {id: req.params.postId}})    
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        //관계메서드
        await post.addLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id})
    } catch (error) {
        console.error(err)
        next(err)
    }
    
})

//좋아요 취소
router.delete('/:postId/like',isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.postId}})    
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id})
    } catch (error) {
        console.error(err)
        next(err)
    }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({
            where: { 
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId) })
    } catch (error) {
        console.error(err);
        next(err);
    }
})

//이미지 업로드

router.post('/images', isLoggedIn, upload.array('image'), async(req, res, next) => {
    //이미지 업로드 후 실행
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
})

//리트윗
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/1/retweet
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
        include: [{
          model: Post,
          as: 'Retweet',
        }],
      });
      if (!post) {
        return res.status(403).send('존재하지 않는 게시글입니다.');
      }
      if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
        return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
      }
      const retweetTargetId = post.RetweetId || post.id;
      const exPost = await Post.findOne({
        where: {
          UserId: req.user.id,
          RetweetId: retweetTargetId,
        },
      });
      if (exPost) {
        return res.status(403).send('이미 리트윗했습니다.');
      }
      const retweet = await Post.create({
        UserId: req.user.id,
        RetweetId: retweetTargetId,
        content: 'retweet',
      });
      const retweetWithPrevPost = await Post.findOne({
        where: { id: retweet.id },
        include: [{
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }, {
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }],
        }],
      })
      res.status(201).json(retweetWithPrevPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.get('/:postId', async (req, res, next) => { // GET /post/1
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });
      if (!post) {
        return res.status(404).send('존재하지 않는 게시글입니다.');
      }
      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [{
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }, {
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }],
        }],
      })
      res.status(200).json(fullPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });


  router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    try {
      await Post.update({
        content: req.body.content
      }, {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      });
      const post = await Post.findOne({ where: { id: req.params.postId }});
      if (hashtags) {
        const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        }))); // [[노드, true], [리액트, true]]
        await post.setHashtags(result.map((v) => v[0]));
      }
      res.status(200).json({ PostId: parseInt(req.params.postId, 10), content: req.body.content });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
module.exports = router;