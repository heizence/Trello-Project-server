const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const databaseUrl = 'mongodb://localhost:27017/local';
const mongoose = require('mongoose')

// 라우터
const signout = require('./routes/signout')
const signin = require('./routes/signin')
const signup = require('./routes/signup')

const app = express();
const port = 3001;

app.set('port', port)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  res.status(200).send('success')
  console.log(`${port}번 포트에서 서버 실행됨\n`)
})

// DB 연결
function connectDB() {
  mongoose.Promise = global.Promise

  mongoose.connect(databaseUrl).then(() => {
    console.log('데이터베이스에 연결되었습니다\n')
  }).catch(err => {
    console.error(err)
  })
}

// 라우터 적용
app.use(signin)
app.use(signup)
app.use(signout)

// 서버 실행
app.listen(app.get('port'), function(req, res) {
  connectDB()
  console.log(`${port}번 포트에서 서버 실행됨\n`)
})