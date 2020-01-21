const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../models/users')

router.route('/users/mypage').put(function(req, res) {
    console.log('사용자 정보 수정 요청 받음 :', req.body)

    let { email, password, username } = req.body

    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')

    if (err) {
        console.error(err)
        return;
    }
    
    if (userModel) {
        console.log('DB 연결됨')

        let condition = { email: email }
        let update = {$set: {password: hash, username: username} }
        
        userModel.findOneAndUpdate(condition, update, function(err, docs) {
            if (docs) {
                console.log('수정된 결과 : ', docs)
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다')
    }
})