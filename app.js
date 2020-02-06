const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const databaseUrl = 'mongodb://localhost:27017/test';

const mongoose = require('mongoose')

// 사용자 관련 정보
const signout = require('./routes/user/signout')
const signin = require('./routes/user/signin')
const signup = require('./routes/user/signup')
const mypage = require('./routes/user/mypage')
const getUserList = require('./routes/user/getUserList')

// 보드 조립하기
const getBoardData = require('./routes/handleData/getBoardData')

const addBoard = require('./routes/handleData/addBoard')
const modifyBoard = require('./routes/handleData/modifyBoard')
const deleteBoard = require('./routes/handleData/deleteBoard')

const addList = require('./routes/handleData/addList')
const modifyList = require('./routes/handleData/modifyList')
const deleteList = require('./routes/handleData/deleteList')

const addCard = require('./routes/handleData/addCard')
const modifyCard = require('./routes/handleData/modifyCard')
const deleteCard = require('./routes/handleData/deleteCard')

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

// DB 연결
function connectDB() {
  mongoose.Promise = global.Promise

  let url = databaseUrl

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`데이터베이스에 연결되었습니다. URL : ${url}\n`)
  }).catch(err => {
    console.error(err)
  })
}

// 사용자 정보
app.use(signin, signup, signout, mypage, getUserList)

// 보드 데이터
app.use(addBoard, modifyBoard, deleteBoard,
  addList, modifyList, deleteList,
  addCard, modifyCard, deleteCard,
  getBoardData
)

// 서버 실행
app.listen(app.get('port'), function() {
  connectDB()
  console.log(`${port}번 포트에서 서버 실행됨\n`)
})
