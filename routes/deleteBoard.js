const express = require('express')
const router = express.Router()
const boardModel = require('../models/boards')

router.route('/users/boardData/deleteBoard').post(function(req, res) {
    console.log('보드 데이터 전송 요청 : ', req.body)

    let { email, boardTitle } = req.body

    if (boardModel) {
        console.log('DB 연결됨')
        
        boardModel.deleteOne({ email: email, boardTitle: boardTitle }, function(err, obj) {
            if (err) {
                console.error(err)
            }
            else {                
                console.log(obj, '보드 수정됨.\n')
                res.status(200).send()
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
