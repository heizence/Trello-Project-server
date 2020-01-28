const express = require('express')
const router = express.Router()
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

router.route('/users/listData/modifyList').put(function(req, res) {
    console.log('리스트 데이터 수정 요청 : ', req.body)

    let { email, boardTitle, oldListTitle, newListTitle } = req.body

    if (listModel) {
        let condition = { email, boardTitle, listTitle: oldListTitle }
        let update = {$set : { listTitle: newListTitle }}

        listModel.findOneAndUpdate(condition, update, function(err) {
            if (err) {
                console.error(err)
            }
            else {
                cardModel.updateMany(condition, update, function(cardError, cardObj) {
                    if (cardError) {
                        console.error(cardError)
                    }
                    else {
                        console.log('리스트 수정 시 리스트 내 카드 수정 : ', cardObj)
                    }
                })

                res.status(200).send()
                console.log('리스트 수정됨.\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
