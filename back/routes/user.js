const express = require('express');
const bcrypt = require('bcrypt');

const { User } = require('../models');


const router = express.Router();



router.post('/', async (req, res, next) => { // POST /user/
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


module.exports = router;