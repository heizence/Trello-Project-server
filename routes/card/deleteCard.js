const express = require('express')
const router = express.Router()
const cardModel = require('../../models/cards')

router.route('/users/cardData/deleteCard').post(function(req, res) {
    console.log('카드 데이터 삭제 요청 : ', req.body)

    let { email, boardTitle, listTitle, contentTitle } = req.body

    if (cardModel) {        
        cardModel.deleteOne({ email, boardTitle, listTitle, contentTitle }, function(err, obj) {
            if (err) {
                console.error(err)
            }
            else {                
                res.status(200).send()
                console.log('카드 삭제됨 : ', obj, '\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
