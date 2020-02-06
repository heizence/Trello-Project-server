const express = require('express')
const router = express.Router()
const userModel = require('../../models/users')

router.route(`/users/userlist`).get(function(req, res) {
    console.log('사용자 목록 조회 요청 받음.')

    if (userModel) {
        userModel.find(function(err, docs) {
            if (err) {
                console.error(err)
            }

            if (docs) {
                console.log('사용자 목록 : ', docs)
                console.log('조회 완료.\n')
                res.status(201).send(docs)
            }
        })
    }
    else {
        console.log('DB 연결 실패\n')
        res.status(500).send()
    }
})


module.exports = router
