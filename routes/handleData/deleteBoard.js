const express = require('express')
const router = express.Router()

const userModel = require('../../models/users')
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

/*
보드 삭제 시 보드 컬렉션 내부의 해당 보드 객체 삭제 
-> 사용자 객체 내부의 보드 정보 수정 
-> 삭제된 보드 내의 모든 리스트 삭제
-> 리스트 내의 모든 카드 삭제
*/

router.route('/users/boardData/deleteBoard').delete(function(req, res) {
    console.log('보드 삭제 요청 : ', req.query.board)

    let boardId = req.query.board

    boardModel.findByIdAndRemove(boardId, function(err, boardObj) {
        if (err) throw err

        if (boardObj) { 
            console.log('삭제할 보드\n')
            console.log(boardObj)
            console.log('\n')

            let condition = { "boards": boardId }
            let update = { "$pull": { "boards": boardId } }

            userModel.findOneAndUpdate(condition, update, function(err) {
                if (err) throw err
                let list = boardObj.lists

                if (list.length > 0) {
                    listModel.find({ "_id": { "$in": list } }, function(err, listObj) {
                        if (err) throw err

                        //console.log('리스트 모음 확인 : ', listObj)

                        let cardIdArray = listObj.reduce((cardIds, list) => {
                                cardIds.push(list.cards)
                                return cardIds
                            }, []).reduce((cardIds, val) => cardIds.concat(val))
                        
                        //console.log('카드 Id 모음 확인 : ', cardIdArray)
                        
                        listModel.deleteMany({ "_id": { "$in": list } }, function(err, listDel) {
                            if (err) throw err
                            console.log('리스트 삭제 확인 : ', listDel)

                            cardModel.deleteMany({ "_id": { "$in": cardIdArray } }, function(err, cardDel) {
                                if (err) throw err
                                console.log('카드 삭제 확인 : ', cardDel)
                            })
                        })
                    })
                }
                console.log('보드 삭제됨.')
                res.status(200).send('보드 삭제됨.')
            })
        }
        else {
            console.log('해당되는 보드를 찾지 못했습니다.\n')
            res.status(201).send('해당되는 보드를 찾지 못했습니다.')
        }
    })
})

module.exports = router
