const express = require('express')
const router = express.Router()
const cardModel = require('../../models/cards')

router.route('/users/cardData/modifyCard').put(function(req, res) {
    console.log('리스트 수정 요청 : ', req.body)

    let { cardId, newCardTitle, contentText } = req.body
     
    let condition = { _id: cardId }
    let update = {$set : { cardTitle: newCardTitle, contentText }}

    cardModel.findOneAndUpdate(condition, update, function(err, obj) {
        if (err) throw err
        
        if (obj) {
            console.log('수정할 카드\n')
            console.log(obj)
            console.log('카드 수정됨.\n')
            res.status(201).send('카드 수정됨')
        }
        else {
            console.log('해당되는 카드를 찾지 못했습니다.\n')
            res.status(404).send('해당되는 카드를 찾지 못했습니다.')
        }
    })
})

module.exports = router
