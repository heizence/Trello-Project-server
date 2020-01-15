const express = require('express')
const router = express.Router()

router.route('/users/signin').post(function(req, res) {
    console.log('login 요청 받음 : ', req.body)

    if (req.session.user) {
        //res.redirect('/main')
        res.send('로그인 되어있음')
    }
    else {
        //res.redirect('/')
        res.send('로그인 안 되어있음')
        res.redirect('/')
    }
    //res.send('로그인 페이지에 요청 보냄')
})

module.exports = router