const express = require('express')
const router = express.Router()

const userModel = require('../../models/users')

router.route('/users/getBoardData').get(function(req, res) {
    console.log('사용자 전체 보드 데이터 전송 요청 : ', req.query.user)

    userModel.findById(req.query.user).populate({
        path: 'boards', populate: { path: 'lists', populate: { path: 'cards' } } 
    }).exec(function(err, user) {
        if (err) {
            res.status(500).send('사용자 정보 불러오기 실패')
        }
        else {
            console.log('사용자 : ', user)
            res.status(201).send(user)            
        }
    })
})

module.exports = router
