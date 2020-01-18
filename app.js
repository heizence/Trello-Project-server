const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const authUser = require('./modules/authUser')
const signUp = require('./modules/signUp')

//const database = require('./db') // DB 관련 객체

const MongoClient = require('mongodb').MongoClient;
const databaseUrl = 'mongodb://localhost:27017/local';
const mongoose = require('mongoose')

// 라우터
const signout = require('./routes/signout')
//const userRouter = require('./routes/user')

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

// DB 연결
var database;

var connectDB = function() {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
        throw err;
    }
    console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl)

    database = db.db('local');
  })
}

// 로그인
app.post('/users/signin', function(req, res) {
    console.log('login 요청 받음 : ', req.body)

    let email = req.body.email
    let password = req.body.password
    let sess = req.session // 세션 설정

    if (database) {
        console.log('DB 연결됨')
        authUser(database, email, password, function(err, docs) {
            if (err) {
                throw err;
            }

            if (docs) {
                // console.log(docs)
                let username = docs[0].username;
                sess.email = email

                //let result = {email: sess.email}

                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
                res.write('Login Success!\n')
                res.write('Email : ' + email + '\n') 
                res.write('Password : ' + password + '\n')
                res.write('Username : ' + username)
                res.end()                
               
               //res.status(200).send(result)
            }
            else {
                console.log('로그인 됨')
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
                res.write('Login Failed!' + '\n')
                res.write('Check your Email and password again!' + '\n')
                res.end();
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
        res.write('데이터베이스 연결 실패')
        res.write('데이터베이스에 연결하지 못했습니다')
        res.end();
    }
})

// 회원가입
app.post('/users/signup', function(req, res) {
  console.log('회원가입 요청 받음 : ', req.body)

  let email = req.body.email
  let password = req.body.password
  let username = req.body.username

  if (database) {
    console.log('DB 연결됨')
    signUp(database, email, password, username, function(err, result) {
      if (err) {
        throw err;
      }

      if (result && result.insertedCount) {
        console.log(result)

        res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'})
        res.write('회원가입 성공!')
        res.end();
      }
      else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'})
        res.write('회원가입 실패!\n')
        res.write(result)
        res.end();
      }    
    })
  }
  else {
    console.log('DB 연결 실패')
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
    res.write('데이터베이스 연결 실패\n')
    res.write('데이터베이스에 연결하지 못했습니다')
    res.end();
  }
})

app.use(signout)

// 서버 실행
app.listen(app.get('port'), function(req, res) {
  connectDB()
  console.log(`${port}번 포트에서 서버 실행됨`)
})