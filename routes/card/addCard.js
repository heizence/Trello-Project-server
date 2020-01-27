const express = require('express')
const router = express.Router()
const cardModel = require('../../models/cards')

router.route('/users/cardData/addCard').post(function(req, res) {
    console.log('카드 데이터 추가 요청 : ', req.body)

    let { email, boardTitle, listTitle, newContentTitle } = req.body

    if (cardModel) {
        console.log('DB 연결됨')
        
        let newCard = new cardModel({
            "email": email,
            "boardTitle": boardTitle,
            "listTitle": listTitle,
            "contentTitle": newContentTitle,
            "contentText": ''
        })

        newCard.save(function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('새로운 카드 추가됨.\n')
            }
        })
    }

    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
