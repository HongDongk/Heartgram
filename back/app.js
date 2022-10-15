const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');


const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

app.use(express.json()); // 프런트에서 json데이터받아오게해주는것 (순서중요!! router들보다 위에써줘야됌)
app.use(express.urlencoded({ extended: true })); // 프런트에서 폼(url)데이터받아오게해주는것 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});