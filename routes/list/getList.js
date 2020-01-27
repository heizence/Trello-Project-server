const express = require('express')
const router = express.Router()
const listModel = require('../../models/lists')

router.route('/users/listData/getList').get(function(req, res) {
    console.log('리스트 데이터 전송 요청. 사용자 이메일 : ', req.query.user)
    
    if (listModel) {
        console.log('DB 연결됨')
        
        listModel.find({email: req.query.user}, function(err, results) {
            if (err) {
                console.error(err)
            }

            if (results.length > 0) {
                res.status(200).send(results)
                console.log('가져온 리스트 데이터 : ', results, '\n')
            }
            else {
                res.status(201).send('저장된 리스트 없음\n')
                console.log('저장된 리스트 없음\n')
            }
        })        
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

module.exports = router
