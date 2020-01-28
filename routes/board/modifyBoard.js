const express = require('express')
const router = express.Router()
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

router.route('/users/boardData/modifyBoard').put(function(req, res) {
    console.log('보드 데이터 수정 요청 : ', req.body)

    let { email, oldBoardTitle, newBoardTitle } = req.body

    if (boardModel) {
        let condition = { email, boardTitle: oldBoardTitle }
        let update = {$set : { boardTitle: newBoardTitle }}

        boardModel.findOneAndUpdate(condition, update, function(err) {
            if (err) {
                console.error(err)
            }
            else {
                listModel.updateMany(condition, update, function(listError, listObj) {
                    if (listError) {
                        console.error(listError)
                    }
                    else {
                        //console.log('보드 수정 시 보드 내 리스트 수정 : ', listObj)
                    }
                })
                
                cardModel.updateMany(condition, update, function(cardError, cardObj) {
                    if (cardError) {
                        console.error(cardError)
                    }
                    else {
                        //console.log('보드 수정 시 보드 내 카드 수정 : ', cardObj)
                    }
                })

                res.status(200).send()
                console.log('보드 수정됨.\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
