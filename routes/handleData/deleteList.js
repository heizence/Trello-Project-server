const express = require('express')
const router = express.Router()

const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

/*
리스트 삭제 시 리스트 컬렉션 내부의 해당 리스트 객체 삭제 
-> 보드 객체 내부의 리스트 정보 수정 
-> 삭제된 리스트 내의 모든 카드 삭제
*/

router.route('/users/listData/deleteList').delete(function(req, res) {
    console.log('리스트 삭제 요청 : ', req.query.id)

    let listId = req.query.id

    listModel.findByIdAndRemove(listId, function(err, listObj) {
        if (err) throw err

        if (listObj) {
            console.log('삭제할 리스트\n')
            console.log(listObj)
            console.log('\n')

            let condition = { "lists": listId }
            let update = { $pull: { "lists": listId } }

            boardModel.findOneAndUpdate(condition, update, function(err) {
                if (err) throw err
                let card = listObj.cards

                if (card.length > 0) {
                    cardModel.deleteMany({ "_id": { "$in": card } }, function(err, cardObj) {
                        if (err) throw err

                        console.log('카드 삭제 확인 : ', cardObj)
                    })
                }
                console.log('리스트 삭제됨.\n')
                res.status(201).send('리스트 삭제됨.')
                
            })
        }
        else {
            console.log('해당되는 리스트를 찾지 못했습니다.\n')
            res.status(404).send('해당되는 리스트를 찾지 못했습니다.')
        }
    })
})

module.exports = router
