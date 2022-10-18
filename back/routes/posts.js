const express = require('express');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();


// 게시글들 불러오기
router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'], // DESC : 내림차순으로 최신게시글부터 불러옴
        [Comment, 'createdAt', 'DESC'], // 내림차순으로 최신댓글부터 불러옴
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      },],
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;