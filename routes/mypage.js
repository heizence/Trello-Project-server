const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../models/users')

router.route('/users/mypage').put(function(req, res) {
    console.log('회원 정보 수정 요청 받음')

    let { email, password, username } = req.body

    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')
    
    if (userModel) {
        console.log('DB 연결됨')

        let condition = { email: email }
        let update = {$set: {password: hash, username: username} }
        
        userModel.findOneAndUpdate(condition, update, function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('회원 정보 수정됨.\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

router.route('/users/mypage').post(function(req, res) {
    console.log('회원 탈퇴 요청 받음 : ', req.body)

    let email = req.body.email

    if (userModel) {
        console.log('DB 연결됨')
        
        userModel.deleteOne({ email: email }, function(err, obj) {
            if (err) {
                console.error(err)
            }
            else {
                if (req.session) { 
                    req.session.destroy(err => {
                        if (err) {
                            console.error(err);
                        } 
                        else {
                            console.log('세션 삭제 확인 : ', req.session)
                        }
                    })
                }

                res.status(200).send()
                console.log(obj, '회원 탈퇴됨.\n')                
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
