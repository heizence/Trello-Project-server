const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

mongoose.set('useFindAndModify', false)

router.route('/users/cardData/addCard').post(function(req, res) {
    console.log('카드 데이터 추가 요청 : ', req.body)

    let { listId, cardTitle, contentText } = req.body

    let newCard = new cardModel({
        cardTitle,
        contentText
    })

    newCard.save(function(err, cardObj) {
        if (err) throw err
                        
        console.log('새로운 카드 추가.\n')
        console.log(cardObj)
        console.log('\n')

        let update = { "$push" : { "cards": cardObj._id }, "new": true, "upsert": true }

        listModel.findByIdAndUpdate(listId, update, function(err, obj) {
            if (err) throw err

            if (obj) {                        
                console.log('리스트의 카드 정보 업데이트 됨.')
                console.log('새로운 카드 추가됨.')
                console.log('요청 처리 완료.\n')
                res.status(200).send(cardObj)
            }
            else {
                console.log('리스트의 카드 정보를 업데이트 하지 못했습니다.\n')
                res.status(500).send('리스트의 카드 정보를 업데이트 하지 못했습니다.')
            }
        })
    })
})

module.exports = router
