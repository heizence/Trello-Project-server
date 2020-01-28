const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const secret = 'heizence'
const userModel = require('../../models/users')
const boardModel = require('../../models/boards')
const listModel = require('../../models/lists')
const cardModel = require('../../models/cards')

router.route('/users/mypage').put(function(req, res) {
    console.log('회원 정보 수정 요청 받음')

    let { email, password, username } = req.body

    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')
    
    if (userModel) {
        console.log('DB 연결됨')

        let condition = { email: email }
        let update = {$set: {password: hash, username: username} }
        
        userModel.findOneAndUpdate(condition, update, function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('회원 정보 수정됨.\n')
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send('데이터베이스에 연결하지 못했습니다\n')
    }
})

router.route('/users/mypage').post(function(req, res) {
    console.log('회원 탈퇴 요청 받음 : ', req.body)

    let email = req.body.email

    if (userModel) {
        userModel.deleteOne({ email: email }, function(err, obj) {
            if (err) {
                console.error(err)
            }
            else {
                boardModel.deleteMany({ email }, function(boardError, boardObj) {
                    if (boardError) {
                        console.error(boardError)
                    }
                    else {
                        console.log('회원 탈퇴 시 보드 삭제 : ', boardObj)
                    }
                })

                listModel.deleteMany({ email }, function(listError, listObj) {
                    if (listError) {
                        console.error(listError)
                    }
                    else {
                        console.log('회원 탈퇴 시 리스트 삭제 : ', listObj)
                    }
                })

                cardModel.deleteMany({ email }, function(cardError, cardObj) {
                    if (cardError) {
                        console.error(cardError)
                    }
                    else {
                        console.log('회원 탈퇴 시 카드 삭제 : ', cardObj)
                    }
                })

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

                res.status(200).send()
                console.log('회원 탈퇴됨.', obj, '\n')                
            }
        })
    }
    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
