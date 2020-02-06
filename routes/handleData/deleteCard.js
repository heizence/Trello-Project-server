const express = require('express')
const router = express.Router()

const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

/*
카드 삭제 시 카드 컬렉션 내부의 해당 카드 객체 삭제 
-> 리스트 객체 내부의 카드 정보 수정 
*/

router.route('/users/cardData/deleteCard').delete(function(req, res) {
    console.log('카드 삭제 요청 : ', req.query.card)

    let cardId = req.query.card

    cardModel.findByIdAndRemove(cardId, function(err, cardObj) {
        if (err) throw err

        if (cardObj) {
            console.log('삭제할 카드\n')
            console.log(cardObj)
            console.log('\n')

            let condition = { "cards": cardId }
            let update = { $pull: { "cards": cardId } }

            listModel.findOneAndUpdate(condition, update, function(err) {
                if (err) throw err

                else {
                    console.log('카드 삭제됨.\n')
                    res.status(200).send('카드 삭제됨.')
                }
            })
        }
        else {
            console.log('해당되는 카드를 찾지 못했습니다.\n')
            res.status(201).send('해당되는 카드를 찾지 못했습니다.')
        }
    })
})

module.exports = router
