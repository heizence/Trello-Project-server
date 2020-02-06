const express = require('express')
const router = express.Router()
const listModel = require('../../models/lists')

router.route('/users/listData/modifyList').put(function(req, res) {
    console.log('리스트 수정 요청 : ', req.body)

    let { listId, newListTitle } = req.body
  
    let condition = { _id: listId }
    let update = {$set : { listTitle: newListTitle }}

    listModel.findOneAndUpdate(condition, update, function(err, obj) {
        if (err) throw err

        if (obj) { 
            console.log('수정할 리스트\n')
            console.log(obj)
            console.log('리스트 수정됨.\n')
            res.status(200).send(update['$set'])
        }
        else {
            console.log('해당되는 리스트를 찾지 못했습니다.\n')
            res.status(201).send('해당되는 리스트를 찾지 못했습니다.')
        }
    })
})

module.exports = router
