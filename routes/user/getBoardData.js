const express = require('express')
const router = express.Router()
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

const assembleBoardData = (board, list, card) => {
    if (!board) {
        return []
    }
    else {
        let output = board.map(board => {
            return {
                boardTitle: board.boardTitle,
                boardContents: filterListData(board.boardTitle, list, card)
            }
        })

        return output
    }
}

// 리스트 데이터를 정제해서 돌려주는 함수
const filterListData = (boardTitle, list, card) => {
    if (!list) {
        return []
    }
    else {
        let listData = list.filter(list => {
            return list.boardTitle === boardTitle
        }).map(list => {
            return {
                title: list.listTitle,
                lists: filterCardData(boardTitle, list.listTitle, card).map(card => {
                    return { contentTitle: card.contentTitle, contentText: card.contentText }
                })
            }
        })

        return listData
    }
}

// 카드 데이터를 정제해서 돌려주는 함수
const filterCardData = (boardTitle, listTitle, card) => {
    if (!card) {
        return []
    }
    else {
        let cardData = card.filter(card => {
            return card.boardTitle === boardTitle && card.listTitle === listTitle
        })

        return cardData
    }
}

router.route('/users/getBoardData').get(function(req, res) {
    console.log('사용자 전체 보드 데이터 : ', req.query.user)
    let board, list, card

    boardModel.find({email: req.query.user}, function(err, results) {
        if (err) {
            console.error(err)
        }

        if (results.length > 0) {
            board = results
        }
        else {             
            console.log('저장된 보드 없음\n')
        }

        listModel.find({email: req.query.user}, function(err, results) {
            if (err) {
                console.error(err)
            }
    
            if (results.length > 0) {
                list = results
            }
            else {
                console.log('저장된 리스트 없음\n')
            }

            cardModel.find({email: req.query.user}, function(err, results) {
                if (err) {
                    console.error(err)
                }
        
                if (results.length > 0) {
                    card = results           
                }
                else {
                    console.log('저장된 카드 없음\n')
                }
                res.status(200).send(assembleBoardData(board, list, card)) 
            })   
        })  
    })            
})

module.exports = router
