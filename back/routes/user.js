const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


const router = express.Router();

// 내 정보 불러오기
router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id', 'email'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id', 'email'],
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
 next(error);
}
});

// 선택한 사용자 정보 불러오기
router.get('/:id', async (req, res, next) => { // GET /user/3
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 선택한 사용자 게시글 불러오기
router.get('/:id/posts', async (req, res, next) => { // GET /user/1/posts
  try {
    const user = await User.findOne({ where: { id: req.params.id }});
    if (user) {
      const where = {};
      if (parseInt(req.query.lastId, 10)) { 
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      } 
      const posts = await user.getPosts({
        where,
        limit: 10,
        include: [{
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }]
        }, {
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }],
      });
      console.log(posts);
      res.status(200).json(posts);
    } else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

//로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});
// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
    try{
        const exUser = await User.findOne({
            where: {
              email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 비밀번호 암호화(숫자높을수록 보안률좋음/속도느림)
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.log(error);
        next(error); // status 500
    }   
});
//닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
      await User.update({
        nickname: req.body.nickname,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
      console.error(error);
      next(error);
    }
});
// 팔로워정보 불러오기
router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
    try {
      const user = await User.findOne({ where: { id: req.user.id }});
      if (!user) {
        res.status(403).send('존재하지 않은 사용자입니다');
      }
      const followers = await user.getFollowers();
      res.status(200).json(followers);
    } catch (error) {
      console.error(error);
      next(error);
    }
});
// 팔로잉정보 불러오기
router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
    try {
      const user = await User.findOne({ where: { id: req.user.id }});
      if (!user) {
        res.status(403).send('존재하지 않은 사용자입니다');
      }
      const followings = await user.getFollowings();
      res.status(200).json(followings);
    } catch (error) {
      console.error(error);
      next(error);
    }
});
// 팔로우 
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
      const user = await User.findOne({ where: { id: req.params.userId }});
      if (!user) {
        res.status(403).send('존재하지 않은 사용자입니다');
      }
      await user.addFollowers(req.user.id);
      res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
});
// 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
      const user = await User.findOne({ where: { id: req.params.userId }});
      if (!user) {
        res.status(403).send('존재하지 않은 사용자입니다');
      }
      await user.removeFollowers(req.user.id);
      res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
});
// 언팔로잉
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/2
    try {
      const user = await User.findOne({ where: { id: req.params.userId }});
      if (!user) {
        res.status(403).send('없는 사람을 차단하려고 하시네요?');
      }
      await user.removeFollowings(req.user.id);
      res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
});

module.exports = router;