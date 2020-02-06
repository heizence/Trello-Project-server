const express = require('express')
const router = express.Router()
const boardModel = require('../../models/boards')

router.route('/users/boardData/modifyBoard').put(function(req, res) {
    console.log('보드 수정 요청 : ', req.body)

    let { boardId, newBoardTitle } = req.body

    let condition = { _id: boardId }
    let update = {$set : { boardTitle: newBoardTitle }}

    boardModel.findOneAndUpdate(condition, update, function(err, obj) {
        if (err) throw err

        if (obj) { 
            console.log('수정할 보드\n')
            console.log(obj)
            console.log('보드 수정됨.\n')
            res.status(200).send(update['$set'])
        }
        else {
            console.log('해당되는 보드를 찾지 못했습니다.\n')
            res.status(201).send('해당되는 보드를 찾지 못했습니다.')
        }
    })
})

module.exports = router
