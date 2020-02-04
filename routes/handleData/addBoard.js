const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = require('../../models/users')
const boardModel = require('../../models/boards')

mongoose.set('useFindAndModify', false)

router.route('/users/boardData/addBoard').post(function(req, res) {
    console.log('새로운 보드 추가 요청 : ', req.body)

    let { userId, boardTitle } = req.body

    let newBoard = new boardModel({
        boardTitle,
        lists: []
    })

    newBoard.save(function(err, boardObj) {
        if (err) throw err
             
        console.log('새로운 보드 추가.\n')
        console.log(boardObj)
        console.log('\n')

        let update = { "$push" : { "boards": boardObj._id }, "new": true, "upsert": true }
        
        userModel.findByIdAndUpdate(userId, update, function(err, userObj) {
            if (err) throw err

            if (userObj) {                        
                console.log('사용자의 보드 정보 업데이트 됨.')
                console.log('새로운 보드 추가됨.')
                console.log('요청 처리 완료.\n')
                res.status(201).send('새로운 보드 추가됨.')
            }
            else {
                console.log('사용자 보드 정보를 업데이트 하지 못했습니다.\n')
                res.status(500).send('사용자 보드 정보를 업데이트 하지 못했습니다.')
            }
        })
    })
})

module.exports = router
