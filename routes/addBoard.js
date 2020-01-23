const express = require('express')
const router = express.Router()
const boardModel = require('../models/boards')

router.route('/users/boardData/addBoard').post(function(req, res) {
    console.log('보드 데이터 전송 요청 : ', req.body)

    let { email, boardTitle } = req.body

    if (boardModel) {
        console.log('DB 연결됨')
        
        let newBoard = new boardModel({
            "email": email,
            "boardTitle": boardTitle
        })

        newBoard.save(function(err) {
            if (err) {
                console.error(err)
            }
            else {
                console.log('새로운 보드 추가됨.\n')
            }
        })
    }

    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
