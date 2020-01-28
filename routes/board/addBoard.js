const express = require('express')
const router = express.Router()
const boardModel = require('../../models/boards')

router.route('/users/boardData/addBoard').post(function(req, res) {
    console.log('보드 데이터 전송 요청 : ', req.body)

    let { email, newBoardTitle } = req.body

    if (boardModel) {        
        let newBoard = new boardModel({
            email,
            boardTitle: newBoardTitle
        })

        newBoard.save(function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('새로운 보드 추가됨.\n')
            }
        })
    }

    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
