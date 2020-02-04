const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../../models/users')

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
        authUser(email, password, function(err, docs) {
            if (err) {
                throw err;
            }

            else {
              if (docs) {
                  sess.email = email
                  userEmail = email
                  
                  console.log('로그인 성공\n')  
                  res.status(200).send(docs[0])
              }
              else {
                  console.log('로그인 실패\n')
                  res.status(201).send()
              }
            }
        })
    }
    else {
        console.log('DB 연결 실패\n')
        res.status(404).send()
    }
})

module.exports = router
