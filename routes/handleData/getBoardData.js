const express = require('express')
const router = express.Router()

const userModel = require('../../models/users')
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')

router.route('/users/getBoardData').get(function(req, res) {
    console.log('사용자 전체 보드 데이터 전송 요청 : ', req.query.id)

    let populateBoard = function(userId) {
        return new Promise(function(resolve, reject) {
            userModel.findById(userId).populate('boards')
            .exec(function(err, user) {
                if (err) { reject(err) }
                resolve(user)
            })      
        })
    }

    let populateList = function(user) {
        console.log('1번째 프로미스 확인 : ', user)
        return new Promise((resolve, reject) => {
            let data = []
            for (let i=0; i<user.boards.length; i++) {                
                boardModel.findById(user.boards[i]._id).populate('lists')
                .exec(function(err, obj) {
                    if (err) { reject(err) }
                    data.push(obj)

                    if (i === user.boards.length - 1) {
                        resolve(data)
                    }
                })
            }
        })
    }

    let populateCard = function(board) {
        console.log('2번째 프로미스 확인 : ', board)
        return new Promise((resolve, reject) => {
            let boardArray = []

            for (let i=0; i<board.length; i++) {
                let lists = board[i].lists
                let listArray = []

                for (let j=0; j<lists.length; j++) {
                    listModel.findById(lists[j]._id).populate('cards')
                    .exec(function(err, obj) {
                        if (err) { reject(err) }
                        listArray.push(obj)

                        if (j === lists.length - 1) {
                            boardArray.push({
                                _id: board[i]._id,
                                boardTitle: board[i].boardTitle,
                                lists: listArray
                            })
                            if (i === board.length - 1) {
                                resolve(boardArray)
                            }
                        }
                    })
                }
            }
        })
    }
    
   populateBoard(req.query.id)
   .then(user => {       
        return populateList(user)
   })
   .then(board => {
       return populateCard(board)
   })
   .then(data => {
       console.log('3번째 프로미스 확인 : ', data)
       res.status(200).send(data)
   })
})

module.exports = router
