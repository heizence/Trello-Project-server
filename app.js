const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')

const expressErrorHandler = require('express-error-handler')
const expressSession = require('express-session')
const userRouter = require('./routes/user')

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
  console.log(`${port}번 포트에서 서버 실행됨`)
})

// const router = express.Router();

// router.route('/signin').post(function(req, res) {
//   console.log(req.body)
//   console.log('로그인 처리함')
//   res.send('로그인 페이지에 요청 보냄')
// })

app.use(userRouter)

// 서버 실행
app.listen(app.get('port'), function(req, res) {
  console.log(`${port}번 포트에서 서버 실행됨`)
})