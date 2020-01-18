const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../models/users')

const authUser = function(email, password, callback) {
    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')
  
    userModel.find({"email": email, "password": hash}, function(err, results) {
      if (err) {
        callback(err, null)
        return;
      }
  
      if (results.length > 0) {
        callback(null, results)
      }
      else {
        callback(null, null)
      }
    })
}

router.route('/users/signin').post(function(req, res) {
    console.log('login 요청 받음 : ', req.body)

    let email = req.body.email
    let password = req.body.password
    let sess = req.session 

    if (userModel) {
        console.log('DB 연결됨')
        authUser(email, password, function(err, docs) {
            if (err) {
                throw err;
            }

            if (docs) {
                let username = docs[0].username;
                sess.email = email
                
                console.log('로그인 성공')                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
                res.write('Login Success!\n')
                res.write('Email : ' + email + '\n') 
                res.write('Password : ' + password + '\n')
                res.write('Username : ' + username)
                res.write('세션 : ' + sess)
                res.end()                
               
               //res.status(200).send(result)
            }
            else {
                console.log('로그인 실패')
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
        res.write('데이터베이스 연결 실패\n')
        res.write('데이터베이스에 연결하지 못했습니다')
        res.end();
    }
})


module.exports = router
