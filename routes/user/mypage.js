const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../../models/users')
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

router.route('/users/mypage/modify').put(function(req, res) {
    console.log('회원 정보 수정 요청 받음')

    let { email, password, username } = req.body

    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')
      
    let condition = { email: email }
    let update = {$set: {password: hash, username: username} }
    
    userModel.findOneAndUpdate(condition, update, function(err) {
        if (err) throw err
        else {
            res.status(200).send('회원 정보 수정됨.')
            console.log('회원 정보 수정됨.\n')
        }
    })    
})

router.route('/users/mypage/secession').delete(function(req, res) {
    console.log('회원 탈퇴 요청 : ', req.query.user)

    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
            } 
            else {
                console.log('세션 삭제 확인 : ', req.session)
            }
        })
    }

    let userId = req.query.user

    userModel.findByIdAndRemove(userId, function(err, userObj) {
        if (err) throw err

        if (userObj) {                
            console.log('삭제할 사용자 정보\n')
            console.log(userObj)
            console.log('요청 처리 완료.\n') 

            let board = userObj.boards

            if (board.length > 0) {
                boardModel.find({ "_id": { "$in": board } }, function(err, boardObj) {
                    if (err) throw err

                    console.log('보드 모음 확인 : ', boardObj)

                    let listIdArray = boardObj.reduce((listIds, board) => {
                        listIds.push(board.lists)
                        return listIds
                    }, []).reduce((listIds, val) => listIds.concat(val))

                    console.log('리스트 Id 모음 확인 : ', listIdArray)

                    boardModel.deleteMany({ "_id": { "$in": board } }, function(err, boardDel) {
                        if (err) throw err
                        console.log('보드 삭제 확인 : ', boardDel)

                        if (listIdArray.length > 0) {
                            listModel.find({ "_id": { "$in": listIdArray } }, function(err, listObj) {
                                if (err) throw err
                                console.log('리스트 모음 확인 : ', listObj)

                                let cardIdArray = listObj.reduce((cardIds, list) => {
                                    cardIds.push(list.cards)
                                    return cardIds
                                }, []).reduce((cardIds, val) => cardIds.concat(val))

                                console.log('카드 Id 모음 확인 : ', cardIdArray)

                                listModel.deleteMany({ "_id": { "$in": listIdArray } }, function(err, listDel) {
                                    if (err) throw err
                                    console.log('리스트 삭제 확인 : ', listDel)
                                    
                                    if (cardIdArray.length > 0) {
                                        cardModel.deleteMany({ "_id": { "$in": cardIdArray } }, function(err, cardDel) {
                                            if (err) throw err
                                            console.log('카드 삭제 확인 : ', cardDel)
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }     
            res.status(200).send('회원 탈퇴됨.')   
        }

        else {
            console.log('해당되는 사용자를 찾지 못했습니다.\n')
            res.status(404).send('해당되는 사용자를 찾지 못했습니다.')
        }
    })    
})

module.exports = router
