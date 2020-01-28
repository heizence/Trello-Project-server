const express = require('express')
const router = express.Router()
const listModel = require('../../models/lists')

router.route('/users/listData/addList').post(function(req, res) {
    console.log('리스트 데이터 추가 요청 : ', req.body)

    let { email, boardTitle, newListTitle } = req.body

    if (listModel) {
        let newList = new listModel({
            "email": email,
            "boardTitle": boardTitle,
            "listTitle": newListTitle
        })

        newList.save(function(err) {
            if (err) {
                console.error(err)
            }
            else {
                res.status(200).send()
                console.log('새로운 리스트 추가됨.\n')
            }
        })
    }

    else {
        console.log('DB 연결 실패')
        res.status(404).send()
    }
})

module.exports = router
