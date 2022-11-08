const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const hashtagRouter = require('./routes/hashtag');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
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

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}
app.use(cors({
    origin: ['http://localhost:3060', 'heartgram.com', 'http://43.201.18.106'],
    credentials: true,
}));
app.use('/', express.static(path.join(__dirname, 'uploads'))); // 이미지 미리보기
app.use(express.json()); // 프런트에서 json데이터받아오게해주는것 (순서중요!! router들보다 위에써줘야됌)
app.use(express.urlencoded({ extended: true })); // 프런트에서 폼(url)데이터받아오게해주는것 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/hashtag', hashtagRouter);
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(80, () => {
  console.log('서버 실행 중!');
});