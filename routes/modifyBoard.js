const express = require('express')
const router = express.Router()
const boardModel = require('../models/boards')

router.route('/users/boardData/modifyBoard').put(function(req, res) {
    console.log('보드 데이터 전송 요청 : ', req.body)

    let { email, oldBoardTitle, newBoardTitle } = req.body

    if (boardModel) {
        console.log('DB 연결됨')
        
        let condition = { email: email, boardTitle: oldBoardTitle }
        let update = {$set : { boardTitle: newBoardTitle }}

        boardModel.findOneAndUpdate(condition, update, function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('보드 수정됨.\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
