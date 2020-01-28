const express = require('express')
const router = express.Router()
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

router.route('/users/boardData/deleteBoard').post(function(req, res) {
    console.log('보드 데이터 삭제 요청 : ', req.body)

    let { email, boardTitle } = req.body

    if (boardModel) {        
        boardModel.deleteOne({ email, boardTitle }, function(err, obj) {
            if (err) {
                console.error(err)
            }
            else {  
                listModel.deleteMany({ email, boardTitle }, function(listError, listObj) {
                    if (listError) {
                        console.error(listError)
                    }
                    else {
                        console.log('보드 삭제 시 보드 내 리스트 삭제 : ', listObj)
                    }
                })
                
                cardModel.deleteMany({ email, boardTitle }, function(cardError, cardObj) {
                    if (cardError) {
                        console.error(cardError)
                    }
                    else {
                        console.log('보드 삭제 시 보드 내 카드 삭제 : ', cardObj)
                    }
                })
                res.status(200).send()
                console.log('보드 삭제됨 : ', obj, '\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
