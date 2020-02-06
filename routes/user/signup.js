const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../../models/users')

const signUp = function(email, password, username, callback) {
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
                else {
                    let newUser = new userModel({
                        "email": email, 
                        "password": hash, 
                        "username": username,
                        "boards": []
                    })

                    newUser.save(function(err) {
                        if (err) {
                            callback(err, null)
                            return;
                        }
                        console.log('신규 사용자 추가됨.\n')
                        callback(null, null)
                    })
                }
            })
        }
    })
}

router.route('/users/signup').post(function(req, res) {
    console.log('회원가입 요청 받음 ')

    let { email, password, username } = req.body
  
    if (userModel) {
      signUp(email, password, username, function(err, result) {
        
        if (err) {
          throw err;
        }
  
        if (!result) {
            console.log('회원가입 성공.')
            console.log('요청 처리 완료.\n')
            res.status(200).send('회원가입이 완료되었습니다!')
        }
        // else {
        //     console.log('회원가입 실패!\n')
        //     res.status(500).send(result)
        // }    
      })
    }
    else {
      console.log('DB 연결 실패')
      res.status(500).send()
    }
})

router.route('/users/checkusername').post(function(req, res) {
    console.log('사용자 이름 중복확인 요청 받음')

    let username = req.body.username
    let isUnique = false

    userModel.find({"username":username}, function(err, docs) {
        if (err) {
            console.error(err)
        }

        if (docs.length > 0) {
            console.log('사용 중인 이름')            
        }
        else {
            console.log('사용 가능한 이름')
            isUnique = true
        }

        res.status(200).send(isUnique)
    })
})

module.exports = router
