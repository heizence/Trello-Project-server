const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const databaseUrl = 'mongodb://localhost:27017/local';
const mongoose = require('mongoose')

// 라우터

// 사용자 관련 정보
const signout = require('./routes/user/signout')
const signin = require('./routes/user/signin')
const signup = require('./routes/user/signup')
const mypage = require('./routes/user/mypage')

// 보드 
const getBoard = require('./routes/board/getBoard')
const addBoard = require('./routes/board/addBoard')
const modifyBoard = require('./routes/board/modifyBoard')
const deleteBoard = require('./routes/board/deleteBoard')

// 리스트
const getList = require('./routes/list/getList')
const addList = require('./routes/list/addList')
const modifyList = require('./routes/list/modifyList')
const deleteList = require('./routes/list/deleteList')

// 카드
const getCard = require('./routes/card/getCard')
const addCard = require('./routes/card/addCard')
const modifyCard = require('./routes/card/modifyCard')
const deleteCard = require('./routes/card/deleteCard')

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

// app.get('/', (req, res) => {
//   res.status(200).send('success')
//   console.log(`${port}번 포트에서 서버 실행됨\n`)
// })

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

// 사용자 정보
app.use(signin, signup, signout, mypage)

// 보드
app.use(getBoard, addBoard, modifyBoard, deleteBoard)

// 리스트
app.use(getList, addList, modifyList, deleteList)

// 카드
app.use(getCard, addCard, modifyCard, deleteCard)

// 서버 실행
app.listen(app.get('port'), function(req, res) {
  connectDB()
  console.log(`${port}번 포트에서 서버 실행됨\n`)
})
