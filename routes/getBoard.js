const express = require('express')
const router = express.Router()
const boardModel = require('../models/boards')

router.route('/users/boardData/getBoard').get(function(req, res) {

    if (boardModel) {
        console.log('DB 연결됨')
        
        boardModel.find(function(err, results) {
            if (err) {
                console.error(err)
            }

            if (results.length > 0) {
                res.status(200).send(results)
                console.log('가져온 보드 데이터 : ', results, '\n')
            }
        })        
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
