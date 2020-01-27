const express = require('express')
const router = express.Router()
const cardModel = require('../../models/cards')

router.route('/users/cardData/modifyCard').put(function(req, res) {
    console.log('카드 데이터 수정 요청 : ', req.body)

    let { email, boardTitle, listTitle, oldContentTitle,
    newContentTitle, contentText } = req.body

    if (cardModel) {
        console.log('DB 연결됨')
        
        let condition = { email, boardTitle, listTitle, contentTitle: oldContentTitle }
        let update = {$set : { contentTitle: newContentTitle, contentText }}

        cardModel.findOneAndUpdate(condition, update, function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('카드 수정됨.\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
