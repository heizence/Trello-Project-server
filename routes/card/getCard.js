const express = require('express')
const router = express.Router()
const cardModel = require('../../models/cards')

router.route('/users/cardData/getCard').get(function(req, res) {
    console.log('카드 데이터 전송 요청. 사용자 이메일 : ', req.query.user)
    
    if (cardModel) {
        cardModel.find({email: req.query.user}, function(err, results) {
            if (err) {
                console.error(err)
            }

            if (results.length > 0) {
                res.status(200).send(results)
                console.log('카드 데이터 불러오기 성공.\n')
                //console.log('가져온 카드 데이터 : ', results, '\n')
            }
            else {
                res.status(201).send(undefined)
                console.log('저장된 카드 없음\n')
            }
        })        
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
