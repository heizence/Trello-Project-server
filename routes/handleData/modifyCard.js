const express = require('express')
const router = express.Router()
const cardModel = require('../../models/cards')

router.route('/users/cardData/modifyCard').put(function(req, res) {
    console.log('카드 수정 요청 : ', req.body)

    let { cardId, newCardTitle, contentText } = req.body     
    let condition = { _id: cardId }
    let update = { $set: {} }

    // 카드 제목 수정할 때
    if (newCardTitle !== '') {
        console.log('제목 수정함')
        update['$set'].cardTitle = newCardTitle
    }
    // 카드 내용 수정할 때
    if (contentText) {
        console.log('내용 수정함')
        update['$set'].contentText = contentText
    }

    cardModel.findOneAndUpdate(condition, update, function(err, obj) {
        if (err) throw err
        
        if (obj) {
            console.log('수정할 카드\n')
            console.log(obj)
            console.log('카드 수정됨.\n')
            res.status(200).send(update['$set'])
        }
        else {
            console.log('해당되는 카드를 찾지 못했습니다.\n')
            res.status(201).send('해당되는 카드를 찾지 못했습니다.')
        }
    })
})

module.exports = router
