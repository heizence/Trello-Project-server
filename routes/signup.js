const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../models/users')

const signUp = function(email, password, username, callback) {
    console.log('signup 호출됨')
    
    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')

    userModel.find({"email":email}, function(err, docs) {
        if (err) {
            callback(err, null)
        }

        if (docs.length > 0) {
            let msg = '이미 가입된 메일 주소입니다\n'
            console.log(msg)
            callback(null, msg)            
        }
        else {
            userModel.find({"username":username}, function(err, docs) {
                if (err) {
                    callback(err, null)
                }

                if (docs.length > 0) {
                    let msg = '이미 사용중인 이름입니다\n'
                    console.log(msg)
                    callback(null, msg)
                }
                else {
                    let newUser = new userModel({
                        "email": email, 
                        "password": hash, 
                        "username": username
                    })

                    newUser.save(function(err) {
                        if (err) {
                            callback(err, null)
                            return;
                        }
                        console.log('신규 사용자 추가됨\n')
                        callback(null, null)
                    })
                }
            })
        }
    })
}

router.route('/users/signup').post(function(req, res) {
    console.log('회원가입 요청 받음 : ', req.body)
  
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
  
    if (userModel) {
      console.log('DB 연결됨')
      signUp(email, password, username, function(err, result) {
        if (err) {
          throw err;
        }
  
        if (!result) {
          res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'})
          res.write('회원가입 성공!\n')
          res.write('Email : ', email, '\n')
          res.write('password : ', password, '\n')
          res.write('username : ', username, '\n')
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

module.exports = router
