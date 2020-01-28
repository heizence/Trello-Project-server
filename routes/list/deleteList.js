const express = require('express')
const router = express.Router()
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

router.route('/users/listData/deleteList').post(function(req, res) {
    console.log('리스트 데이터 삭제 요청 : ', req.body)

    let { email, boardTitle, listTitle } = req.body

    if (listModel) {        
        listModel.deleteOne({ email: email, boardTitle: boardTitle, listTitle: listTitle }, function(err, obj) {
            if (err) {
                console.error(err)
            }
            else {
                cardModel.deleteMany({ email, boardTitle, listTitle }, function(cardError, cardObj) {
                    if (cardError) {
                        console.error(cardError)
                    }
                    else {
                        console.log('리스트 삭제 시 리스트 내 카드 삭제 : ', cardObj)
                    }
                })
                console.log('리스트 삭제됨 : ', obj, '\n')
                res.status(200).send()
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
