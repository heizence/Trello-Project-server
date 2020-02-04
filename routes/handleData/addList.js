const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')

mongoose.set('useFindAndModify', false)

router.route('/users/listData/addList').post(function(req, res) {
    console.log('새로운 리스트 추가 요청 : ', req.body)

    let { boardId, listTitle } = req.body

    let newList = new listModel({
        listTitle,
        cards: []
    })

    newList.save(function(err, listObj) {
        if (err) throw err
        
        console.log('새로운 리스트 추가.\n')
        console.log(listObj)
        console.log('\n')

        let update = { "$push" : { "lists": listObj._id }, "new": true, "upsert": true }

        boardModel.findByIdAndUpdate(boardId, update, function(err, obj) {
            if (err) throw err

            if (obj) {                        
                console.log('보드의 리스트 정보 업데이트 됨.')
                console.log('새로운 리스트 추가됨.')
                console.log('요청 처리 완료.\n')
                res.status(201).send('새로운 리스트 추가됨.')
            }
            else {
                console.log('보드의 리스트 정보를 업데이트 하지 못했습니다.\n')
                res.status(500).send('보드의 리스트 정보를 업데이트 하지 못했습니다.')
            }
        })
    })
})

module.exports = router
